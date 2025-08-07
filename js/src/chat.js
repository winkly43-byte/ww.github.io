document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendBtn');
  const inputBox = document.getElementById('inputBox');
  const chatBox = document.getElementById('chatBox');

  sendBtn.addEventListener('click', async () => {
    const userText = inputBox.value.trim();
    if (!userText) return;
    appendMessage('你', userText);
    inputBox.value = '';
    
    try {
      const apiUrl = localStorage.getItem('apiUrl');     // 用户自填 API URL
      const apiKey = localStorage.getItem('apiKey');     // 用户自填 API Key
      const voiceId = localStorage.getItem('voiceId');   // 用户自填 Voice ID

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userText }],
          model: "gpt-3.5-turbo" // 可改成你自己支持的模型
        })
      });

      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content || "出错了，请检查 API 设置";
      appendMessage('AI', aiReply);
      playTextVoice(aiReply, apiKey, voiceId); // 语音播放

    } catch (err) {
      appendMessage('AI', '⚠️ 出错了，请检查控制台和 API 设置');
      console.error(err);
    }
  });

  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msg);
  }
});