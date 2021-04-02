class SquareCard extends HTMLElement {
  set payments(payments) {
    (async () => {
      this.card = await payments.card();
      await this.card.attach(this);
    })();

    payments.card().then((card) => {
      card.attach(this);
    });
  }

  get value() {
    return this.card.tokenize();
  }
}

function createLabel({ innerText, forInput }) {
  const label = document.createElement('label');
  label.setAttribute('for', forInput);
  label.innerText = innerText;
  return label;
}

function createInput({ name, placeholder, required }) {
  const input = document.createElement('input');
  input.name = name;
  input.setAttribute('name', name);
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('required', required);
  return input;
}

function createLabeledInput({ placeholder, label, name, required }) {
  return [
    createLabel({ forInput: name, innerText: label }),
    createInput({ name, placeholder, required }),
  ];
}

function createButton({ text, type }) {}

class BillingContact extends HTMLElement {
  constructor() {
    super();

    const givenNameLabelAndInput = createLabeledInput({
      name: 'givenName',
      placeholder: 'Given Name',
      label: 'Given Name',
      required: true,
    });

    this.givenNameInput = givenNameLabelAndInput[1];

    const familyNameLabelAndInput = createLabeledInput({
      name: 'familyName',
      placeholder: 'Family Name',
      label: 'Family Name',
      required: true,
    });

    this.familyNameInput = familyNameLabelAndInput[1];
  }
}

class CardForm extends HTMLElement {
  constructor() {
    super();
    const submitButton = document.createElement('button');

    this.append(
      createLabeledInput({
        name: 'givenName',
        placeholder: 'Given Name',
        label: 'Given Name',
        required: true,
      }),
      createLabeledInput({})
    );
  }
  set payments(payments) {
    payments.card().then((card) => {
      card.attach(this);
      this.card = card;
      this.activate();
    });
  }

  activate() {
    const submitButton = this.querySelector('button[type="submit"]');
  }

  get tokenResult() {
    this.card.tokenize;
  }
}
customElements.define('square-card', SquareCard);
