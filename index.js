const owner = "csfrey";
const repo = "csfrey";
const mdPath = "documents/resume.md";

const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${mdPath}`;

async function fetchResumeMd() {
  try {
    const mdText = await fetch(fileUrl)
      .then((response) => response.json())
      .then((data) => atob(data.content));

    return mdText;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function populateResume() {
  const mdText = await fetchResumeMd();
  const converter = new showdown.Converter();
  const html = converter.makeHtml(mdText);

  document.getElementById("resume-text").innerHTML = html;
}

window.addEventListener("resize", positionFieldsets);

const breakpoint = 1160;

function positionFieldsets() {
  const main = document.getElementById("main-content");

  if (main.offsetWidth > breakpoint) {
    main.classList.add("inline");
    main.classList.remove("stacked");
  } else {
    main.classList.remove("inline");
    main.classList.add("stacked");
  }
}
