const useSpeakerDeviceChange = (client, mediaScreen) => {
  client.on('device-change', () => {
    console.log('-----------useSpeakerDeviceChange--------------');
    let speakers = mediaScreen.getSpeakerList();
    let microphones = mediaScreen.getMicList();

    console.log(mediaScreen.getSpeakerList());
    console.log(mediaScreen.getMicList());

    speakers = mediaScreen.getSpeakerList();
    microphones = mediaScreen.getMicList();
  });
};

export default useSpeakerDeviceChange;
