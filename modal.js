window.addEventListener('load', () => {
  // Enable table parsing explicitly
  marked.setOptions({ gfm: true, tables: true });

  const MD_PATH  = 'https://raw.githubusercontent.com/Kasei1/workout/main/program.md';
  const backdrop = document.getElementById('mdBackdrop');
  const content  = document.getElementById('mdContent');
  const closeBtn = document.getElementById('mdClose');

  async function openMarkdown () {
    content.innerHTML = '<p style="opacity:.7;">Loading…</p>';
    try {
      const res = await fetch(MD_PATH);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      content.innerHTML = marked.parse(await res.text());
    } catch (err) {
      content.innerHTML = `<p style="color:#ff5d5d;">${err}</p>`;
    }
    backdrop.classList.add('show');
  }

  function closeModal () { backdrop.classList.remove('show'); }

  document.querySelectorAll('.open-md').forEach(btn => btn.addEventListener('click', openMarkdown));
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
});