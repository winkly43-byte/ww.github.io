// ai-voice-hook.js — 自动监听 AI 回复并语音播报

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.classList.contains('ai')) {
        const aiText = node.innerText.trim();
        if (aiText) {
          const apiKey = localStorage.getItem('apiKey');       // 用户自行填写的 key
          const voiceId = localStorage.getItem('voiceId');     // 用户自行填写的 voice ID
          if (apiKey && voiceId) {
            playTextVoice(aiText, apiKey, voiceId);
          } else {
            console.warn('未设置 apiKey 或 voiceId，无法播放语音');
          }
        }
      }
    });
  });
});

// 监听整个聊天区域（请根据实际调整选择器）
const chatContainer = document.querySelector('#chat') || document.body;
observer.observe(chatContainer, {
  childList: true,
  subtree: true
});