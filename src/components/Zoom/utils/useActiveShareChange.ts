const useActiveShareChange = async (
  client,
  mediaScreen,
  participantShareScreenRef
) => {
  const onActiveShareChange = async (payload: any) => {
    console.log('payload', payload);

    if (payload.state === 'Active') {
      mediaScreen.startShareView(
        participantShareScreenRef.current,
        payload.userId
      );
      participantShareScreenRef.current.style.display = 'block';
    } else {
      payload.action === 'Inactive';

      mediaScreen.stopShareView();
      participantShareScreenRef.current.style.display = 'none';
    }
  };

  client.on('active-share-change', onActiveShareChange);

  return () => {
    client.off('active-share-change', onActiveShareChange);
  };
};

export default useActiveShareChange;
