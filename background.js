chrome.commands.onCommand.addListener(async (command) => {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  if (tabs.length < 2) return;

  tabs.sort((a, b) => a.index - b.index);
  const current = tabs.findIndex((t) => t.active);
  const delta = command === "next-tab" ? 1 : -1;
  const target = tabs[(current + delta + tabs.length) % tabs.length];

  await chrome.tabs.update(target.id, { active: true });
});
