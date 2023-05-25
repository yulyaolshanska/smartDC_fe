import { AppointmentFormValues } from '@components/general/type';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import React, { useEffect } from 'react';
import { createSocketWithHandlers } from '@components/Zoom/socket-io';
import { io, Socket } from 'socket.io-client';
import cookie from 'utils/functions/cookies';
import { store } from '@redux/store';
import { zoomApi } from 'services/ZoomService';
import { useTranslation } from 'react-i18next';

const token = cookie.get('accessToken');

const Scheduler = () => {
  const dispatch = useAppDispatch();

  const socketCallConfig = useAppSelector(
    (state) => state.socketAppointmenttReducer.callConfig
  );

  const [getSignature] = zoomApi.useGetSignatureMutation();

  React.useEffect(() => {
    if (!socketCallConfig.signature && socketCallConfig.tpc) {
      getSignature({ ...socketCallConfig }).then((res) => {
        const updatedCallConfig = {
          ...socketCallConfig,
          signature: res.error.data,
        };
        dispatch(socketAppointmentActions.updateCallConfig(updatedCallConfig));
      });
    }
  }, [socketCallConfig]);

  // React.useEffect(() => {

  // },[socketCallConfig])

  const socketNextAppointment = useAppSelector(
    (state) => state.socketAppointmenttReducer.nextAppointment
  );

  const handleAppointmentStarted = (data) => {
    dispatch(
      socketAppointmentActions.updateNextAppointment(data.nextAppointment)
    );
    if (!socketCallConfig.session_key)
      dispatch(
        socketAppointmentActions.updateCallConfig({
          ...socketCallConfig,
          session_key: data.roomName,
        })
      );
  };

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
  }, []);

  return <div></div>;
};

export default Scheduler;
