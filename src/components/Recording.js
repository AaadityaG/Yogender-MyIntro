const videoRef = useRef(null); // Reference for the video element
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const streamRef = useRef(null);
  const [recordingEnded, setRecordingEnded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isRecording && !paused) {
      recordingIntervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(recordingIntervalRef.current);
    }

    return () => clearInterval(recordingIntervalRef.current);
  }, [isRecording, paused]);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play(); // Start playing the video
    }
  }, [streamRef.current]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    setVideoUrl(null);
    setSeconds(0);
    setPaused(false);
    setCountdown(3);
    setRecordingEnded(false);

    let counter = 3;
    const interval = setInterval(() => {
      setCountdown(counter);
      counter -= 1;
      if (counter < 0) {
        clearInterval(interval);
        initializeRecording();
      }
    }, 1000);
  };

  const initializeRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });
      const recordedChunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecordingEnded(true);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setCountdown(null);
      setSeconds(0);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const handlePauseResume = () => {
    if (mediaRecorderRef.current) {
      if (paused) {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.pause();
      }
      setPaused(!paused);
    } else {
      console.error("MediaRecorder is not initialized.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);

      streamRef.current.getTracks().forEach((track) => track.stop());
    } else {
      console.error("MediaRecorder is not initialized.");
    }
  };

  const handleRetake = () => {
    setVideoUrl(null);
    setIsRecording(false);
    setPaused(false);
    setSeconds(0);
    setRecordingEnded(false);
    streamRef.current = null;
  };

  const formatSeconds = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    handleRetake();
    setShowDeleteModal(false);
  };

