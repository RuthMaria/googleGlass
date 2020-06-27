
const IBGE_API_URL =
"https://servicodados.ibge.gov.br/api/v1/localidades/estados";

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch(IBGE_API_URL)
      .then(res => res.json())
      .then(states => {
          for (const state of states) {
              ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
          }
      })
}

function getCities(event) {
  const citySelect = document.querySelector("select[id=cities]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value
  const url = `${IBGE_API_URL}/${ufValue}/municipios`
  
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  
  citySelect.innerHTML = '<option> Selecione a cidade...</option>'
  citySelect.disabled = false

  fetch(url)
      .then(res => res.json())
      .then(cities => {
          for (const city of cities) {
              citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`

          }
      })
}

populateUFs()
 
document.querySelector('select[name=uf]').addEventListener('change', getCities)

function totalPrice() {
    const amount = parseInt(document.getElementById('amount').value) 
    const price = amount * 1500
    document.getElementById("price").value = price
}
