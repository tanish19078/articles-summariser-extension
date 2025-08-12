document.getElementById("summarizeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractHTML" }, response => {
      chrome.runtime.sendMessage(
        { action: "summarize", html: response.html, url: response.url },
        res => {
          document.getElementById("summaryOutput").innerText =
            res.error || res.summary || "No summary.";
        }
      );
    });
  });
});
