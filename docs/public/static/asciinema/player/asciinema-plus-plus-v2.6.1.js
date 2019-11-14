/*
  Watch the given terminal element for all mutations; when a mutation
  occurs, check if the cursor is on the screen, and scroll it into view.
*/
const watchTerminal = (terminal, found = false) => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      var cursor = terminal.querySelector(".cursor");

      if (found && !cursor) {
        found = false;
      }

      if (cursor) {
        found = true;

        // cursor.scrollIntoView() is bad because it scrolls parent frame too
        // So, set the scroll manually (terminal is the scroll container)
        // The 20(px) is a fudge factor, should be equal to 1 line height
        terminal.scrollTop = cursor.offsetTop - terminal.clientHeight + 20;
      }
    });
  });

  observer.observe(terminal, { childList: true, subtree: true });
};

/*
  Make an observer on document.body for when the wrapper node appears
*/
const makeDocumentObserver = onTerminalAdded =>
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!mutation.addedNodes) {
        return;
      }

      for (let addedNode of mutation.addedNodes) {
        if (
          addedNode.className &&
          addedNode.className.includes("asciinema-player-wrapper")
        ) {
          onTerminalAdded(addedNode);
        } else {
          continue;
        }
      }
    });
  });

/*
  Return a promise that resolves once the terminal wrapper node has
  appeared in document.body
*/
const waitForTerminalWrapper = () => {
  const maybeExisting = document.querySelector(".asciinema-player-wrapper");
  if (maybeExisting) {
    return Promise.resolve(maybeExisting);
  }

  return new Promise((resolve, reject) => {
    const documentObserver = makeDocumentObserver(terminalWrapperNode => {
      documentObserver.disconnect();

      resolve(terminalWrapperNode);
    });

    documentObserver.observe(document.body, { childList: true, subtree: true });
  });
};

const keepCursorInView = terminalWrapperNode => {
  const terminalNode = terminalWrapperNode.querySelector(".asciinema-terminal");

  watchTerminal(terminalNode);
};

/*
  For devices without fullscreen enabled (basically only iPhone safari),
  "polyfill" it by making the fullscreen button a link that opens the page
  in its own tab (we assume we're inside of an iframe).

  Fullscreen is supported on all desktop browsers, all mobile android browsers,
  and safari on iPad. It is not supported in safari on iPhone.
*/
const polyfillFullscreenish = terminalWrapperNode => {
  if (document.fullscreenEnabled) {
    return;
  }

  const fullscreenBtn = terminalWrapperNode.querySelector(".fullscreen-button");

  if (!fullscreenBtn) {
    return;
  }

  fullscreenBtn.addEventListener("click", e => {
    e.preventDefault();

    const link = document.createElement("a");
    link.href = window.location.href;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

/*
  The main block of code

  Once the terminal has appeared on the page, create an indefinite observer
  of all mutations on it, which will scroll the cursor into view when necessary.
*/
(() => {
  waitForTerminalWrapper().then(terminalWrapperNode => {
    keepCursorInView(terminalWrapperNode);
    polyfillFullscreenish(terminalWrapperNode);
  });
})();
