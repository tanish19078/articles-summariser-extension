function getArticleHTML() {
  let documentClone = document.cloneNode(true);
  let article = new Readability(documentClone).parse();
  return article ? article.content : document.body.innerHTML;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractHTML") {
    sendResponse({ html: getArticleHTML(), url: window.location.href });
  }
});
