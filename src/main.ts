import "./style.css";

const viewports = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Viewport = keyof typeof viewports;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="container mx-auto max-w-4xl">
    <div class="mt-8">
      <label class="text-base font-semibold text-gray-900">URL to Preview</label>
      <input type="text" id="url" class="border border-gray-400 rounded p-2 w-full" value="https://svelte.dev" />
    </div>

    <div class="mt-4">
      <label class="text-base font-semibold text-gray-900">Viewport Size</label>
      <select class="border border-gray-400 rounded p-2 w-full">
        ${Object.keys(viewports).map((key) => `<option value="${key}">${key}</option>`).join("")}
      </select>
    </div>
  </main>

  <iframe id="preview" class="mt-8 h-[560px] border border-gray-400 rounded mx-auto resize-x" style="width: 1024px;" src="https://svelte.dev/">
  </iframe>
`;

const input = document.querySelector<HTMLInputElement>("input")!;
const frame = document.querySelector<HTMLIFrameElement>("iframe")!;
const select = document.querySelector<HTMLSelectElement>("select")!;

select.addEventListener("change", () => {
  const value = select.value;

  if (value in viewports) {
    return frame.style.width = `${viewports[value as Viewport]}px`;
  }

  frame.style.height = "100%";
});

input.addEventListener("input", () => setUrl(input.value));
input.addEventListener("paste", () => setUrl(input.value));

function setUrl(url: string) {
  if (url) {
    frame.src = url;
  }
}

