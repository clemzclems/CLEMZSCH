document.getElementById("verseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const ref = document.getElementById("reference").value.trim();
  const translation = document.getElementById("translation").value;
  const resultRef = document.getElementById("ref");
  const verseText = document.getElementById("verseText");

  resultRef.textContent = `Loading ${ref} (${translation.toUpperCase()})...`;
  verseText.textContent = "";

  try {
    let url = "";

    if (translation === "kjv" || translation === "web") {
      // bible-api.com works with KJV and WEB
      url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=${translation}`;
    } else if (translation === "bbe") {
      // bolls.life API for BBE
      url = `https://bolls.life/get-text/${encodeURIComponent(ref)}/?translation=BBE`;
    }

    const res = await fetch(url);
    const data = await res.json();

    let text = "";

    if (translation === "bbe") {
      // BBE returns an array of verses
      if (Array.isArray(data) && data.length > 0) {
        text = data.map(v => v.text).join(" ");
      }
    } else {
      // KJV / WEB returns a single object with text
      text = data.text || "Verse not found";
    }

    resultRef.textContent = ref + " (" + translation.toUpperCase() + ")";
    verseText.textContent = text;
  } catch (err) {
    console.error(err);
    resultRef.textContent = ref;
    verseText.textContent = "Error fetching verse.";
  }
});
