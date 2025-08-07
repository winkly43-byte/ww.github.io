// speech.js — ElevenLabs 语音播放模块

// 添加语音播放按钮和播放器
const playAudioBtn = document.createElement('button');
playAudioBtn.id = 'playAudioBtn';
playAudioBtn.style = 'display:none; position:fixed; top:10px; right:50px; z-index:1000; padding:6px 12px; font-size:14px;';
playAudioBtn.innerText = '▶️ 播放语音';
document.body.appendChild(playAudioBtn);

const audioPlayer = document.createElement('audio');
audioPlayer.id = 'audioPlayer';
audioPlayer.style = 'display:none;';
document.body.appendChild(audioPlayer);

// 播放按钮点击事件
playAudioBtn.addEventListener('click', () => {
  audioPlayer.play();
});

// 主函数：调用 ElevenLabs TTS
async function playTextVoice(text, apiKey, voiceId) {
  if (!text || !apiKey || !voiceId) return;
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      })
    });
    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayer.src = audioUrl;
    playAudioBtn.style.display = 'block';
  } catch (err) {
    console.error("语音播放失败:", err);
  }
}