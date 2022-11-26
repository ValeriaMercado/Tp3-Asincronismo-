// responsive menu
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)


const getJobs = () => {
  fetch("https://638152199440b61b0d15c5d8.mockapi.io/jobs")
    .then(res => res.json())
    .then(data => listJobs(data))
}

getJobs()

const listJobs = (jobs) => {
  for (const { id, name, description, location, category, seniority } of jobs) {
    $("#container-jobs").innerHTML += `
    <div class=" h-[10%] w-full mx-auto px-5 mb-3">
        <div class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        ${name}</h5>
                        <div class="flex space-x-6 justify-center">
                          <div class="text-xs ont-bold uppercase text-teal-700 mt-1 mb-2">${location}</div>
                          <div class="text-xs font-bold uppercase text-black-700 mt-1 mb-2">${category}</div>
                          <div class="text-xs font-bold uppercase text-red-700 mt-1 mb-2">${seniority}</div>
                        </div>

                        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">${description}<p>
               
                  <div class = "flex justify-between text-center space-x-4">
                    <a href="#" class="h-1/3 w-1/3 rounded bg-blue-200 btn-delete" data-id="${id}">Ver detalles</a>
               
                  </div>
            </div>
        </div>

    </div>
    `
  }
}


     // <a href="#" class="h-1/3 w-1/3 rounded bg-green-500 btn-delete" data-id="${id}">Editar</a>
                    // <a href="#" class="h-1/3 w-1/3 rounded bg-red-500 btn-delete" data-id="${id}">Eliminar</a>