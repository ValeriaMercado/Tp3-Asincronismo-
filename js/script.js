// responsive navbar
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let isSubmit = false

const getJobs = () => {
  fetch("https://638152199440b61b0d15c5d8.mockapi.io/jobs")
    .then((res) => res.json())
    .then((data) => listJobs(data));
};

getJobs();

const jobAsync = async (id) => {
  const response = await fetch(
    `https://638152199440b61b0d15c5d8.mockapi.io/jobs/${id}`
  );
  const job = await response.json();
  return job;
};


const addJob = () => {
  fetch("https://638152199440b61b0d15c5d8.mockapi.io/jobs", {
    method: "POST",
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(saveJob())
  }).finally(() => window.location.href = "index.html")
}

const editJob = (id) => {
  fetch(`https://638152199440b61b0d15c5d8.mockapi.io/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveJobInfo()),
  }).finally(() => (window.location.href = "index.html"));
};

const deleteJob = (id) => {
  fetch(`https://638152199440b61b0d15c5d8.mockapi.io/jobs/${id}`, {
    method: "DELETE",
  }).finally(() => (window.location.href = "index.html"));
};

const saveJobInfo = () => {
  return {
    name: $("#editName").value,
    description: $("#editDescription").value,
    location: $("#locationFormEdit").value,
    seniority: $("#seniorityFormEdit").value,
    category: $("#categoriesFormEdit").value,
  };
};

const listJobs = (jobs) => {
  setTimeout(() => {
    $("#btnSpin").innerHTML = ""
    for (const { id, name, description, location, category, seniority } of jobs) {
      let textClass = ''
      if (name === "Backend Developer") {
        textClass = "red-700"
      } else if (name === "Frontend Developer") {
        textClass = "blue-700"
      } else if (name === "Tester") {
        textClass = "green-500"
      } else if (name === "Architect") {
        textClass = "pink-500"
      } else if (name === "DevOps") {
        textClass = "purple-500"
      }
      $("#container-jobs").innerHTML += `
    <div class=" h-[10%] w-full mx-auto px-5 mb-3">
        <div class="max-w-xl bg-white rounded-lg border border-gray-300 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
                    <h5 class="mb-2 text-${textClass} text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        ${name}</h5>
                        <div class="flex space-x-6 justify-center">
                          <div class="text-xs font-bold uppercase text-teal-700 mt-1 mb-2">${location}</div>
                          <div class="text-xs font-bold uppercase text-black-700 mt-1 mb-2">${category}</div>
                          <div class="text-xs font-bold uppercase text-red-700 mt-1 mb-2">${seniority}</div>
                        </div>

                        <p class="truncate mb-3 text-sm text-gray-700 dark:text-gray-400">${description}<p>
               
                  <div class = "flex justify-between text-center space-x-4">
                    <a href="#" class="h-1/3 w-1/3 rounded bg-blue-200 btn-details" data-id="${id}">Ver detalles</a>
               
                  </div>
            </div>
        </div>

    </div>
    `;
    }
    for (const btn of $$(".btn-details")) {
      btn.addEventListener("click", () => {
        const jobId = btn.getAttribute("data-id");
        jobAsync(jobId).then((data) => detailsJob(data));
      });
    }
  }, 2000)



};

const detailsJob = (job) => {
  setTimeout(() => {
    $("#btnSpin").innerHTML = ""
    $("#container-jobs").innerHTML = `
    <div class="max-w-xl flex justify-items-center bg-white rounded-lg border border-gray-300 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="p-5">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                ${job.name}</h5>
                <div class="flex space-x-6 justify-center">
                  <div class="text-xs font-bold uppercase text-teal-700 mt-1 mb-2">${job.location}</div>
                  <div class="text-xs font-bold uppercase text-black-700 mt-1 mb-2">${job.category}</div>
                  <div class="text-xs font-bold uppercase text-red-700 mt-1 mb-2">${job.seniority}</div>
                </div>
  
                <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">${job.description}<p>
       
          <div class = "flex justify-between text-center space-x-4">
          <a href="#" class="h-1/3 w-1/3 rounded bg-green-500 btn-edit" data-id="${job.id}" >Editar</a>
          <a href="#" class="h-1/3 w-1/3 rounded bg-red-500 btn-delete" data-id="${job.id}">Eliminar</a>
          <a href="#" class="h-1/3 w-1/3 rounded bg-blue-500 btn-back">Volver</a>
       
          </div>
    </div>
    `;

    for (const btn of $$(".btn-edit")) {
      btn.addEventListener("click", () => {
        isSubmit = false
        const jobId = btn.getAttribute("data-id");
        $("#submitEdit").setAttribute("data-id", jobId);
        jobAsync(jobId).then((data) => showFormEdit(data));
      });
    }

    for (const btn of $$(".btn-delete")) {
      btn.addEventListener("click", () => {
        $("#container-jobs").classList.add("hidden");
        $("#alertDelete").classList.remove("hidden")
        $("#filters").classList.add("hidden");
        $("#testimonials").classList.add("hidden");
        const jobId = btn.getAttribute("data-id");
        $("#submit-delete").setAttribute("data-id", jobId)
        // deleteJob(jobId);
      });
    }
  }, 2000)


};

const saveJob = () => {
  return {
    name: $("#editName").value,
    description: $("#editDescription").value,
    location: $("#locationFormEdit").value,
    seniority: $("#seniorityFormEdit").value,
    category: $("#categoriesFormEdit").value
  }
}

const showFormEdit = (job) => {
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.remove("hidden");
  $("#filters").classList.add("hidden");
  $("#testimonials").classList.add("hidden");
  $("#submit").classList.add("hidden");
  $("#editName").value = job.name;
  $("#editDescription").value = job.description;
  $("#locationFormEdit").value = job.location;
  $("#seniorityFormEdit").value = job.seniority;
  $("#categoriesFormEdit").value = job.category;

};

$("#formEditJob").addEventListener("submit", (e) => {
  e.preventDefault();
  if (isSubmit) {
    addJob()
  } else {
    const id = $("#submitEdit").getAttribute("data-id");
    editJob(id);
  }
});

$("#showForm").addEventListener("click", () => {
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.remove("hidden");
  $("#container-jobs").classList.add("hidden");
  $("#filters").classList.add("hidden");
  $("#testimonials").classList.add("hidden");
  $("#submitEdit").classList.add("hidden");
  isSubmit = true



})

$("#submit-delete").addEventListener("click", () => {
  const jobId = $("#submit-delete").getAttribute("data-id")
  deleteJob(jobId)
})

$("#btnCancelDelete").addEventListener("click", () =>{
  window.location.href = "index.html"
})



// filtros

const searchLocation = (location) => {
  fetch(`https://638152199440b61b0d15c5d8.mockapi.io//jobs?location=${location}`)
    .then(res => res.json())
    .then(data => listJobs(data))
}

$("#btnSearchJob").addEventListener("click", () =>{
  $("#container-jobs").innerHTML = ""
  searchLocation($("#locationFilters").value)
})

const searchCategory= (category) => {
  fetch(`https://638152199440b61b0d15c5d8.mockapi.io//jobs?category=${category}`)
    .then(res => res.json())
    .then(data =>listJobs(data))
}

$("#btnSearchJob").addEventListener("click", () =>{
  $("#container-jobs").innerHTML = ""
  searchCategory($("#categoriesFilters").value)
  
})

const searchSeniority= (seniority) => {
  fetch(`https://638152199440b61b0d15c5d8.mockapi.io//jobs?seniority=${seniority}`)
    .then(res => res.json())
    .then(data =>listJobs(data))
}

$("#btnSearchJob").addEventListener("click", () =>{
  $("#container-jobs").innerHTML = ""
  searchSeniority($("#seniorityFilters").value)
 
})


$("#btnClean").addEventListener("click", () =>{
  $("#container-jobs").innerHTML = ""
 getJobs()
})

