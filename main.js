/* Se importa los datos del JSON y se los guarda dentro de la variable "data" */
import data from "./data.json" assert {type: "json"}

/* Obtención de los elementos del documento con la clase "container" */
const container = document.getElementsByClassName("container");

/* Declaración e inicialización de la variable "posicion" que se usará para cambia la imagen de fondo del body */
var posicion = 1

/* Crea un fragmento que contendrá todo el contendido HTML que se agregará al DOM */
var fragmento = document.createDocumentFragment();

function crea_card(group) {
    /* Creación de cada elemento que compone las CARDS */
    const div_card = document.createElement("div");
    const div_card_front = document.createElement("div");
    const div_card_front_header = document.createElement("div");
    const card_front_header_title = document.createElement("h1");
    const card_front_header_icon = document.createElement("img");
    const div_card_front_body = document.createElement("div");
    const card_front_body_title = document.createElement("h3");
    const div_card_back = document.createElement("div");
    const card_back_group_name = document.createElement("h1");
    const card_back_icon_project = document.createElement("img");
    const card_back_btn_redirect_to = document.createElement("a");

    /* Se crea la estructura de las CARDS agregando cada etiqueta en su lugar */
    div_card.appendChild(div_card_front);
    div_card.appendChild(div_card_back);
    div_card_front.appendChild(div_card_front_header);
    div_card_front.appendChild(div_card_front_body);
    div_card_back.appendChild(card_back_group_name);
    div_card_back.appendChild(card_back_icon_project);
    div_card_back.appendChild(card_back_btn_redirect_to);
    div_card_front_header.appendChild(card_front_header_title);
    div_card_front_header.appendChild(card_front_header_icon);
    div_card_front_body.appendChild(card_front_body_title);

    /* Se carga el contenido de cada elemento "Contenido de texto" y "fuente de imágenes" */
    card_front_header_title.textContent = group.GrupoNro;
    card_front_header_icon.src = group.IconoDelGrupo;
    card_front_body_title.textContent = "Integrantes";
    group.Integrantes.forEach( // Como son varios integrantes se crea un elemento "P" para cada uno y se le agrega la clase "card_front-body-paragraph"
        integrante => {        // para luego agregarla dentro del "div" correspondiente ("card_front_body_paragraph")
            let card_front_body_paragraph = document.createElement("p");
            card_front_body_paragraph.textContent = integrante;
            card_front_body_paragraph.classList.add("card_front-body-paragraph");
            div_card_front_body.appendChild(card_front_body_paragraph);
        }
    )
    card_back_group_name.textContent = group.NombreDelGrupo;
    card_back_icon_project.style.background = 'url('+group.IconoDelGrupo+')';
    card_back_icon_project.style.backgroundPosition = 'center';
    card_back_icon_project.style.backgroundSize = 'contain';
    card_back_icon_project.style.backgroundRepeat = 'no-repeat';
    card_back_btn_redirect_to.textContent = "Abrir"
    if(group.NombreDelGrupo === "Fundación Mascotitas Del Sur"){
        card_back_btn_redirect_to.href = "fundacion"
    }
    else if(group.NombreDelGrupo === "Sushi Agüi"){
        card_back_btn_redirect_to.href = "sushiagui"
    }
    else if(group.NombreDelGrupo === "Escuela Rosalind Franklin"){
        card_back_btn_redirect_to.href = "escuela"
    }
    else {
        card_back_btn_redirect_to.href = group.NombreDelGrupo.replace(" ", "").toLowerCase()
    }

    /* Se agrega a cada elemento la clase correspondiente para darle el estilo desde CSS */
    div_card.classList.add("card");
    div_card_front.classList.add("card_front");
    div_card_front_header.classList.add("card_front-header");
    card_front_header_title.classList.add("card_front-header-title");
    card_front_header_icon.classList.add("card_front-header-icon");
    div_card_front_body.classList.add("card_front-body");
    card_front_body_title.classList.add("card_front-body-title");
    div_card_back.classList.add("card_back");
    card_back_group_name.classList.add("group-name");
    card_back_icon_project.classList.add("icon-project");
    card_back_btn_redirect_to.classList.add("btn-redirect_to");

    /* Agrega la card creada al fragmeto */
    fragmento.appendChild(div_card);
}

/* Se agrega el oyente del evento "load" a la ventana para que cuando la página cargue
se creen todas las cards y para que cada 5segundos cambie la imagen de fondo del body */
window.addEventListener("load", () => {
    data.grupos.forEach( //Recorre el arreglo de grupos obtenidos del JSON
        group => {
            crea_card(group) // Crea la card para cada uno de los grupos
        }
    )

    container[0].appendChild(fragmento); // Agrega al contenedor el fragmento que contiene todas las cards creadas

    setInterval(() => {
        if (posicion == 5) {
            posicion = 1;
        }
        else {
            posicion++;
        }
        document.body.style.backgroundImage = `url('./Images/imagen ${posicion}.avif')`;
    }, 5000)
})







