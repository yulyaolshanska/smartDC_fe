import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import React, { useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import cookie from 'utils/functions/cookies';
import { usePrevious } from 'utils/hooks/usePrevious';
import { zoomApi } from 'services/ZoomService';

const token = cookie.get('accessToken');

const Scheduler = () => {
  const dispatch = useAppDispatch();

  const socketCallConfig = useAppSelector(
    (state) => state.socketAppointmenttReducer.callConfig
  );

  const [getSignature] = zoomApi.useGetSignatureMutation();

  const prevCallConfig = usePrevious(socketCallConfig);

  const handleGetSignature = useCallback(() => {
    if (!socketCallConfig.signature) {
      getSignature({ ...socketCallConfig }).then((res) => {
        console.log(res.error.data);
        const updatedCallConfig = {
          ...socketCallConfig,
          signature: res.error.data,
        };
        dispatch(socketAppointmentActions.updateCallConfig(updatedCallConfig));
      });
    }
  }, [socketCallConfig, getSignature, dispatch]);

  useEffect(() => {
    handleGetSignature();
  }, [handleGetSignature]);

  const socketNextAppointment = useAppSelector(
    (state) => state.socketAppointmenttReducer.nextAppointment
  );

  const handleAppointmentStarted = useCallback(
    (data) => {
      console.log(data);
      dispatch(
        socketAppointmentActions.updateNextAppointment(data.nextAppointment)
      );
      console.log('key', socketCallConfig);
      if (!socketCallConfig.session_key) {
        console.log('key');
        dispatch(
          socketAppointmentActions.updateCallConfig({
            ...socketCallConfig,
            session_key: data.roomName,
          })
        );
      }
    },
    [socketCallConfig, dispatch]
  );

  useEffect(() => {
    const socket = io(
      `${import.meta.env.VITE_REACT_APP_BASE_URL_SERVER}appointment`,
      {
        auth: {
          token,
        },
        transports: ['websocket', 'polling'],
      }
    );

    socket.on('connect', () => {});

    socket.on('appointment_update', handleAppointmentStarted);

    return () => {
      socket.disconnect();
    };
  }, [handleAppointmentStarted]);

  return <div></div>;
};

export default Scheduler;
