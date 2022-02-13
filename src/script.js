import "prismjs";

function $(a, b = document) {
  return b.querySelector(a);
}
function $all(a, b = document) {
  return [...b.querySelectorAll(a)];
}

// DarkMode
class DarkMode {
  constructor(el, namespace, setMetaTheme) {
    this.root = document.querySelector("html");
    if (namespace) this.namespace = namespace;
    if (setMetaTheme) this.setMetaTheme = setMetaTheme;
    this.label = "darkMode";
    this.InitializeTheme();
    el.addEventListener("click", () => this.toggleTheme());
  }

  InitializeTheme() {
    if (this.namespace) this.label = `${this.namespace}-darkMode`;
    let theme = localStorage.getItem(this.label);

    if (theme === "false" || theme == null) {
      this.setLightMode();
      if (this.setMetaTheme) this.setMeta("light");
    } else {
      this.setDarkMode();
      if (this.setMetaTheme) this.setMeta("dark");
    }
  }

  setMeta(theme) {
    let meta = document.querySelector('html meta[name="theme-color"]');
    if (!meta) {
      let meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document
        .querySelector("head")
        .insertAdjacentHTML(
          "beforeend",
          `<meta name="theme-color" content="${
            theme === "dark" ? "#191919" : "#ffffff"
          }" />`
        );
      return;
    }

    meta.insertAdjacentHTML(
      "afterend",
      `<meta name="theme-color" content="${
        theme === "dark" ? "#191919" : "#ffffff"
      }" />`
    );
    meta.remove();
  }

  toggleTheme() {
    let theme = localStorage.getItem(this.label);
    if (theme === "false") {
      this.setDarkMode();
      if (this.setMetaTheme) this.setMeta("dark");
    } else {
      this.setLightMode();
      if (this.setMetaTheme) this.setMeta("light");
    }
  }

  setDarkMode() {
    this.root.classList.add("dark");
    localStorage.setItem(this.label, true);
    if (this.setMetaTheme) this.setMeta("dark");
  }

  setLightMode() {
    this.root.classList.remove("dark");
    localStorage.setItem(this.label, false);
    if (this.setMetaTheme) this.setMeta("light");
  }
}

new DarkMode($("#darkMode-toggle"), "html5Elements", true);

// Progress
let tempval = 0;
setInterval(updateProgress, 1000);
function updateProgress() {
  tempval += 5;
  if (tempval > 100) tempval = 0;
  $("progress").setAttribute("value", tempval);
  $(
    ".prog"
  ).innerHTML = `<code class=" language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>progress</span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${tempval}<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>${tempval}%<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>progress</span><span class="token punctuation">&gt;</span></span></code>`;
}

// Meter
let meterVal = 0;
setInterval(updateMeter, 700);
function updateMeter() {
  meterVal += 32;
  if (meterVal > 1024) meterVal = 0;
  $("meter").setAttribute("value", meterVal);
  $(
    ".metpre"
  ).innerHTML = `<code class=" language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meter</span> <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1024<span class="token punctuation">"</span></span> <span class="token attr-name">low</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>200<span class="token punctuation">"</span></span> <span class="token attr-name">high</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>800<span class="token punctuation">"</span></span> <span class="token attr-name">optimum</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>400<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${meterVal}<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
  at ${meterVal}/1024
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>meter</span><span class="token punctuation">&gt;</span></span></code>`;
}

// Range Input Value
$all(".range input").forEach(
  (e) =>
    (e.oninput = () => {
      $(".val", e.closest(".range")).innerHTML = e.value;
    })
);
