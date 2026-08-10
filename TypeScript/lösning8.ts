// 1. Inställningar (Anpassad till din HTTPS-port från Visual Studio)
interface ICar {
  id?: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

const API_URL = 'http://localhost:5103/api/cars';

// 2. DOM-referenser
const loadBtn: HTMLButtonElement = document.querySelector('#load-btn') as HTMLButtonElement;
const carList: HTMLDivElement = document.querySelector('#car-list') as HTMLDivElement;
// const carForm: HTMLFormElement = document.querySelector('#car-form') as HTMLFormElement;
// const carIdInput: HTMLInputElement = document.querySelector('#car-id') as HTMLInputElement;
// const formTitle: HTMLHeadingElement = document.querySelector('#form-title') as HTMLHeadingElement;
// const cancelBtn: HTMLButtonElement = document.querySelector('#cancel-btn') as HTMLButtonElement;

const showEditView = (carId: string) => {
  const editView: HTMLDivElement = document.querySelector(`#edit-view-${carId}`) as HTMLDivElement;
  editView.className = 'show-element';
};
const hideEditView = (carId: string) => (document.querySelector(`#edit-view-${carId}`)!.className = 'hide-element');

const showDialog = (title: string, message: string, car?: ICar) => {
  const dialog: HTMLDialogElement = document.querySelector('#messageDialog') as HTMLDialogElement;
  const messageTitle: HTMLElement = document.querySelector('#messageTitle') as HTMLElement;
  const messageContent: HTMLParagraphElement = document.querySelector('#messageContent') as HTMLParagraphElement;
  const messageValuesList: HTMLUListElement = document.querySelector('#messageValuesList') as HTMLUListElement;
  messageValuesList.innerHTML = '';
  messageTitle.innerHTML = title;
  messageContent.innerHTML = message;

  if (car != null && messageValuesList != null) {
    const carId = document.createElement('li');
    const carBrand = document.createElement('li');
    const carModel = document.createElement('li');
    const carYear = document.createElement('li');
    const carColor = document.createElement('li');
    carId.innerHTML = `Id: ${car.id}`;
    carBrand.innerHTML = `Märke: ${car.brand}`;
    carModel.innerHTML = `Model: ${car.model}`;
    carYear.innerHTML = `År: ${car.year}`;
    carColor.innerHTML = `Färg: ${car.color}`;

    messageValuesList.appendChild(carId);
    messageValuesList.appendChild(carBrand);
    messageValuesList.appendChild(carModel);
    messageValuesList.appendChild(carYear);
    messageValuesList.appendChild(carColor);
  }

  dialog.showModal();
};

const hideDialog = () => {
  const dialog: HTMLDialogElement = document.querySelector('#messageDialog') as HTMLDialogElement;
  dialog.close();
};

const hideDialogBtn: HTMLButtonElement = document.querySelector('#hide-dialog-btn') as HTMLButtonElement;
hideDialogBtn.addEventListener('click', () => {
  hideDialog();
});

// ==========================================
// 🟢 DELETE (DELETE) - Radera en bil
// ==========================================
const deleteCar = async (carId: string) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Statuskod:', response.status);
    console.log('Svar från server:', data);
    const carCard: HTMLDivElement = document.querySelector(`#car-card-${carId}`) as HTMLDivElement;
    carCard.remove();

    showDialog('Bekräftelse', `Bilen med id ${carId} är borttagen`);
  } catch (error) {
    showDialog('Fel', `Det blev ett fel: ${error}`);
  }
};

// ==========================================
// 🟢 CREATE (POST) - Skapa en bil
// ==========================================
const createCar = async () => {
  const brand = document.querySelector<HTMLInputElement>('#brand')!.value;
  const model = document.querySelector<HTMLInputElement>('#model')!.value;
  const yearText = document.querySelector<HTMLInputElement>('#year')!.value;
  const color = document.querySelector<HTMLInputElement>('#color')!.value;
  const year = parseInt(yearText);

  if (Number.isInteger(year) == false) {
    showDialog('Fel', 'Fältet år får endast innehålla nummer!');
    return;
  }

  const nyBil: ICar = {
    brand: brand,
    model: model,
    year: year,
    color: color,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nyBil),
    });
    const data = await response.json();

    console.log('Statuskod:', response.status);
    console.log('Skapad resurs:', data);

    showDialog('Bekräftelse', 'Skapade bil med följande värden:', data);
  } catch (error) {
    showDialog('Fel', `Det blev ett fel:\n ${error}`);
  }
};

const submitBtn: HTMLButtonElement = document.querySelector('#submit-btn') as HTMLButtonElement;
submitBtn.addEventListener('click', () => {
  createCar();
});

// ==========================================
// 🟢 UPDATE (PUT) - Uppdatera en bil
// ==========================================
const updateCar = async (carId?: number) => {
  console.log('--- Skickar PUT för ID 1 ---');
  const brand = document.querySelector<HTMLInputElement>(`#edit-brand-${carId}`)!.value;
  const model = document.querySelector<HTMLInputElement>(`#edit-model-${carId}`)!.value;
  const yearText = document.querySelector<HTMLInputElement>(`#edit-year-${carId}`)!.value;
  const color = document.querySelector<HTMLInputElement>(`#edit-color-${carId}`)!.value;
  const year = parseInt(yearText);

  const car: ICar = {
    id: carId, // ID måste matcha URL:en och databasen
    brand: brand,
    model: model,
    year: year,
    color: color,
  };
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });

    console.log('Statuskod (bör vara 204 No Content):', response.status);

    const carCardInfoDiv: HTMLDivElement = document.querySelector(`#car-card-info-div-${car.id}`) as HTMLDivElement;
    carCardInfoDiv.innerHTML = `
                <strong>${car.brand} ${car.model}</strong> (${car.year}) <br>
                <span style="font-size: 0.9rem; color: #777;">Färg: ${car.color}</span>
                `;

    showDialog('Bekräftelse', `Uppdaterade bilen med id ${carId} till följande egenskaper:`, car);
  } catch (error) {
    showDialog('Fel', `Det blev ett fel:\n ${error}`);
  }
};

// ==========================================
// 🟢 READ (GET) - Hämta och visa alla bilar
// ==========================================
const fetchCars = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Fel vid hämtning: ${response.status}`);
    }

    const cars = await response.json();

    // Töm listan innan vi ritar ut på nytt
    carList.innerHTML = '';

    if (cars.length === 0) {
      carList.innerHTML = '<p>Det finns inga bilar i databasen.</p>';
      return;
    }

    // Loopa igenom bilarna och bygg HTML för varje kort
    cars.forEach((car: ICar) => {
      const card = document.createElement('div');
      card.className = 'car-container';
      card.id = `car-card-${car.id}`;
      const infoCardPart: HTMLDivElement = createInfoCardPart(car);
      const editViewCardPart: HTMLDivElement = creatEditViewCardPart(car);
      card.appendChild(infoCardPart);
      card.appendChild(editViewCardPart);
      carList.appendChild(card);
    });
  } catch (error) {
    console.error('Fel:', error);
    carList.innerHTML = `<p style="color: red;">Kunde inte hämta bilar. Körs ditt API på ${API_URL}?</p>`;
  }
};

// Event listener för ladda-knappen
loadBtn.addEventListener('click', fetchCars);

const createInfoCardPart = (car: ICar): HTMLDivElement => {
  const infoCardPart: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  infoCardPart.className = 'car-card';
  infoCardPart.innerHTML = `
      <div id="car-card-info-div-${car.id}">
        <strong>${car.brand} ${car.model}</strong> (${car.year}) <br>
        <span style="font-size: 0.9rem; color: #777;">Färg: ${car.color}</span>
      </div>
  `;
  const buttonGroup: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  buttonGroup.className = 'btn-group';

  const showEditViewButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
  showEditViewButton.type = 'button';
  showEditViewButton.className = 'outline';
  showEditViewButton.style = 'padding: 0.25rem 0.5rem; font-size: 0.8rem;';
  showEditViewButton.textContent = 'Redigera';
  showEditViewButton.addEventListener('click', () => {
    showEditView(`${car.id}`);
  });

  const deleteCarButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
  deleteCarButton.type = 'button';
  deleteCarButton.className = 'outline contrast';
  deleteCarButton.style = 'padding: 0.25rem 0.5rem; font-size: 0.8rem;';
  deleteCarButton.textContent = 'Ta bort';
  deleteCarButton.addEventListener('click', () => {
    deleteCar(`${car.id}`);
  });

  buttonGroup.appendChild(showEditViewButton);
  buttonGroup.appendChild(deleteCarButton);
  infoCardPart.appendChild(buttonGroup);

  return infoCardPart;
};

const creatEditViewCardPart = (car: ICar): HTMLDivElement => {
  const editViewCardPart: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  editViewCardPart.id = `edit-view-${car.id}`;
  editViewCardPart.className = 'hide-element';
  editViewCardPart.innerHTML = `
    <div class="grid">
      <label>
          Märke
          <input type="text" id="edit-brand-${car.id}" value="${car.brand}">
      </label>
      <label>
          Modell
          <input type="text" id="edit-model-${car.id}" value="${car.model}">
      </label>
  </div>
  <div class="grid">
      <label>
          Årsmodell
          <input type="number" id="edit-year-${car.id}" value="${car.year}">
      </label>
      <label>
          Färg
          <input type="text" id="edit-color-${car.id}" value="${car.color}">
      </label>
  </div>
  `;

  const buttonGroup: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  buttonGroup.style = 'display: flex; gap: 1rem;';

  const updateCarButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
  updateCarButton.type = 'button';
  updateCarButton.textContent = 'Spara bil';
  updateCarButton.addEventListener('click', () => {
    updateCar(car.id);
  });

  const hideEditViewButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
  hideEditViewButton.type = 'button';
  hideEditViewButton.textContent = 'Avbryt';
  hideEditViewButton.addEventListener('click', () => {
    hideEditView(`${car.id}`);
  });

  buttonGroup.appendChild(updateCarButton);
  buttonGroup.appendChild(hideEditViewButton);
  editViewCardPart.appendChild(buttonGroup);

  return editViewCardPart;
};
