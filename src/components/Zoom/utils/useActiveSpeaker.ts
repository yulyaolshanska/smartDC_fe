const useActiveSpeaker = async (client) => {
  const onActiveSpeakerChange = (payload) => {
    console.log('Active speaker', payload);
  };

  client.on('active-speaker', onActiveSpeakerChange);

  return () => {
    client.off('active-speaker', onActiveSpeakerChange);
  };
};

export default useActiveSpeaker;
