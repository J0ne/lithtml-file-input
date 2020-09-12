import { html, render } from "lit-html";

class Fileinput extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.files = [];
    this.attachShadow({ mode: "open" });

    this.update();
    const fileInput = this.shadowRoot.querySelector("input[type=file]");

    fileInput.addEventListener("change", (e) => {
      console.log("->", e.currentTarget.files);
      this.files = [...this.files, ...e.currentTarget.files];

      this.update();
    });
  }

  template() {
    return html`
      <style>
        input[type="file"] {
          opacity: 0;
        }
        .fileinput {
          background-color: lightblue;
        }
        .preview {
          display: flex;
          flex-wrap: wrap;
          padding: 5px;
          height: auto;
        }
        .thumbnail {
          position: relative;
        }
        img {
          border-radius: 4px; /* Rounded border */
          padding: 5px; /* Some padding */
          width: 150px; /* Set a small width */
          height: 150px;
          border: 1px solid #ddd; /* Gray border */
        }
        img:hover {
          box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
        }
        span {
          width: 4rem;
          display: inline-block;
          text-align: center;
        }
        label {
          background-color: #7F9CCB;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px ridge black;
          font-size: 0.8rem;
          height: auto;
        }
        .fileinput {
          max-width: 50%;
          height: auto;
        }

        .close {
          border: 1px solid grey;
          background-color: white;
          float: right;
          width: 20px;
          display: inline-block;
          border-radius: 8px;
          right: 10px;
          top: 10px;
          opacity: 0.5;
          position: absolute;
          cursor: pointer;
        }
      </style>
      <div class="fileinput">
        <div class="preview">
          ${this.files.length > 0
            ? html` ${this.files.map(
                (file) =>
                  html`<div class="thumbnail">
                    <button
                      name="${file.name}"
                      @click="${(e) => this.remove(e)}"
                      class="close"
                    >
                      X
                    </button>
                    <img
                      src="${URL.createObjectURL(file)}"
                      alt="${file.name}"
                    />
                  </div>`
              )}`
            : html`<p>Ei valittuja tiedostoja</p>`}
        </div>
        <div class="btn">
          <label for="fileUploads">Valitse</label>
          <input multiple id="fileUploads" type="file" />
        </div>
        ${this.files.length > 0
          ? html`<button class="btn">Tallenna</button>`
          : ""}
      </div>
    `;
  }
  remove(e) {
    //
    const name = e.currentTarget.name;
    this.files = this.files.filter((file) => file.name !== name);
    this.update();
  }

  update() {
    render(this.template(), this.shadowRoot, { eventContext: this });
  }
}

customElements.define("file-input", Fileinput);
