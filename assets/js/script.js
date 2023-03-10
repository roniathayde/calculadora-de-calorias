const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault(); 

    verifyFields ();
    getResult();

    
    const gender = getSelectedValue('gender')

    const age = getInputNumberValue('age');
    
    const weight = getInputNumberValue('weight');
    
    const height = getInputNumberValue('height');

    const activityLevel = getSelectedValue('activity_level');



    const tmb = Math.round(
        (
            gender === 'female'
            ? ( 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age) )
            : ( 66 + (13.7 * weight) + (5 * height) - (6.8 * age) )
        )
    );

    const maintenance = Math.round( ( tmb * Number( activityLevel ) ) );

    const loseWeight = maintenance - 450;

    const gainWeight = maintenance + 450;

    const layout = `
        
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
      </ul>
    </div>
        
    `;

    const result = document.getElementById('result');

    result.innerHTML = layout;
}

function getResult(){
  
  let container = document.getElementById('get-result-container');

  container.style.top = "14px";

  setTimeout(()=>{
    container.style.top = "-100%";
  }, 3000)

}

function getSelectedValue(id) {
    const select = document.getElementById(id);

    return select.options[select.selectedIndex].value
}


function getInputNumberValue(id){
    return Number(document.getElementById(id).value)
}

function verifyFields () {
  let fields = document.querySelectorAll('.form-group input')

  fields.forEach( (element)=>{

    if ( element.value == "" ) {


      
      element.previousElementSibling.textContent
      
      let container = document.getElementById('error-content')      

      document.querySelector('.error_wrapper-content').textContent = ""

      document.querySelector('.error_wrapper-content').innerHTML += `
      Preencha todos os campos.  <br>    
      O campo: ${element.previousElementSibling.textContent} precisa de atenção`

      container.style.top = "14px"
      
      setTimeout(()=>{
        container.style.top = "-100%";
      }, 3000)
      
      throw new Error('Houve um erro no formulário')
    }
    

  });

}