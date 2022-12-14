// responsive navbar
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let isSubmit = false;

const hideSpinner = (selector) => selector.classList.add("hidden");
const showSpinner = (selector) => selector.classList.remove("hidden");

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
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveJob()),
  }).finally(() => (window.location.href = "index.html"));
};

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
  showSpinner($("#btnSpin"));
  setTimeout(() => {
    hideSpinner($("#btnSpin"));
    for (const {
      id,
      name,
      description,
      location,
      category,
      seniority,
    } of jobs) {
      let img = "";
      if (category === "Desarrollo") {
        img =
          "https://www.pngplay.com/wp-content/uploads/13/Programmer-PNG-Photos.png";
      } else if (category === "Soporte") {
        img =
          "https://www.jalpro.com/wp-content/uploads/2019/09/soporte_pc2-1024x1024.png";
      } else if (category === "Seguridad") {
        img =
          "https://www.sos-info.es/wp-content/uploads/2019/10/info-sec-service_12.png";
      } else if (category === "Insfraestructura") {
        img =
          "https://www.believeit.cl/wp-content/uploads/2019/04/datacenter.png";
      } else if (category === "QA") {
        img =
          "https://www.amaris.com/wp-content/uploads/2020/08/Quality-Assurance-Quality-Control.png";
      }
      $("#container-jobs").innerHTML += `
    <div class=" h-[10%] w-full mx-auto px-5 mb-3">
        <div class="max-w-xl  bg-white rounded-lg border border-blue-300 shadow-md dark:bg-gray-800 dark:border-gray-700">
         <h5 class="mb-2 bg-blue-300 w-full h-[40px] py-2 text-xl font-bold tracking-tight dark:text-white align-center text-center">
                        ${name}</h5>
            <div class="p-5">
                        <div class="w-[140px] mx-auto">
                        <img src=${img}></div>
                        <div class="flex space-x-2 justify-center">
                          <div class="text-xs font-bold uppercase bg-green-600 text-white p-[2px] rounded mt-4 mb-2">${location}</div>
                          <div class="text-xs font-bold uppercase bg-gray-600 text-white p-[2px] rounded mt-4 mb-2">${category}</div>
                          <div class="text-xs font-bold uppercase bg-red-600 text-white p-[2px] rounded mt-4 mb-2">${seniority}</div>
                        </div>

                        <p class="truncate mb-3 text-m font-bold dark:text-gray-400">${description}<p>
               
                  <div class = "flex justify-between text-center space-x-4 font-bold">
                    <a href="#" class="h-1/3 w-1/2 rounded bg-blue-200 btn-details p-[2px]" data-id="${id}">Ver detalles</a>
               
                  </div>
            </div>
        </div>

    </div>
    `;
    }
    for (const btn of $$(".btn-details")) {
      btn.addEventListener("click", () => {
        $("#btnSpin").innerHTML = "";
        $("#container-jobs").innerHTML = " ";
        const jobId = btn.getAttribute("data-id");
        jobAsync(jobId).then((data) => detailsJob(data));
      });
    }
  }, 2000);
};

const detailsJob = (job) => {
  showSpinner($("#btnSpin2"));
  setTimeout(() => {
    hideSpinner($("#btnSpin2"));
    let img = "";
    if (job.category === "Desarrollo") {
      img =
        "https://www.pngplay.com/wp-content/uploads/13/Programmer-PNG-Photos.png";
    } else if (job.category === "Soporte") {
      img =
        "https://www.jalpro.com/wp-content/uploads/2019/09/soporte_pc2-1024x1024.png";
    } else if (job.category === "Seguridad") {
      img =
        "https://www.sos-info.es/wp-content/uploads/2019/10/info-sec-service_12.png";
    } else if (job.category === "Insfraestructura") {
      img =
        "https://www.believeit.cl/wp-content/uploads/2019/04/datacenter.png";
    } else if (job.category === "QA") {
      img =
        "https://www.amaris.com/wp-content/uploads/2020/08/Quality-Assurance-Quality-Control.png";
    }
    $("#container-jobs").innerHTML = `
    <div class="max-w-xl flex justify-items-center bg-white rounded-lg border border-gray-300 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="detailCard p-5">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                ${job.name}</h5>
                  <div class="w-[140px] mx-auto">
                        <img src=${img}></div>
                <div class="flex space-x-6 justify-center mt-4">
                  <div class="text-xs font-bold uppercase bg-green-600 text-white p-[2px] rounded mt-1 mb-2">${job.location}</div>
                  <div class="text-xs font-bold uppercase bg-gray-600 text-white p-[2px] rounded  mt-1 mb-2">${job.category}</div>
                  <div class="text-xs font-bold uppercase  bg-red-600 text-white p-[2px] rounded  mt-1 mb-2">${job.seniority}</div>
                </div>
  
                <p class="mb-3 text-m font-bold  dark:text-gray-400">${job.description}<p>
       
          <div class = "flex justify-between text-center space-x-4">
          <a href="#" class="h-1/3 w-1/3 font-bold rounded bg-green-500 btn-edit" data-id="${job.id}" >Editar</a>
          <a href="#" class="h-1/3 w-1/3 font-bold rounded bg-red-500 btn-delete" data-id="${job.id}">Eliminar</a>
          <a href="#" class="h-1/3 w-1/3 font-bold rounded bg-blue-500 btn-back">Volver</a>
       
          </div>
    </div>
    `;

    for (const btn of $$(".btn-edit")) {
      btn.addEventListener("click", () => {
        isSubmit = false;
        const jobId = btn.getAttribute("data-id");
        $("#submitEdit").setAttribute("data-id", jobId);
        jobAsync(jobId).then((data) => showFormEdit(data));
      });
    }

    for (const btn of $$(".btn-back")) {
      btn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    for (const btn of $$(".btn-delete")) {
      btn.addEventListener("click", () => {
        $(".detailCard").classList.add("hidden");
        $("#container-jobs").classList.add("hidden");
        $("#alertDelete").classList.remove("hidden");
        $("#filters").classList.add("hidden");
        $("#testimonials").classList.add("hidden");
        $("#footer").classList.add("hidden");
        const jobId = btn.getAttribute("data-id");
        $("#submit-delete").setAttribute("data-id", jobId);
      });
    }
  }, 2000);
};

const saveJob = () => {
  return {
    name: $("#editName").value,
    description: $("#editDescription").value,
    location: $("#locationFormEdit").value,
    seniority: $("#seniorityFormEdit").value,
    category: $("#categoriesFormEdit").value,
  };
};

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
    addJob();
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
  isSubmit = true;
});

$("#submit-delete").addEventListener("click", () => {
  const jobId = $("#submit-delete").getAttribute("data-id");
  deleteJob(jobId);
});

$("#btnCancelDelete").addEventListener("click", () => {
  window.location.href = "index.html";
});

// filters

const searchLocation = (location) => {
  fetch(
    `https://638152199440b61b0d15c5d8.mockapi.io//jobs?location=${location}`
  )
    .then((res) => res.json())
    .then((data) => listJobs(data));
};

$("#btnSearchJob").addEventListener("click", () => {
  showSpinner($("#btnSpin2"));
  setTimeout(() => {
    hideSpinner($("#btnSpin2"));
    $("#container-jobs").innerHTML = "";
    searchLocation($("#locationFilters").value);
  }, 2000);
});

const searchCategory = (category) => {
  fetch(
    `https://638152199440b61b0d15c5d8.mockapi.io//jobs?category=${category}`
  )
    .then((res) => res.json())
    .then((data) => listJobs(data))
    .catch(() => alert(`No se encontraron resultados`));
};

$("#btnSearchJob").addEventListener("click", () => {
  showSpinner($("#btnSpin2"));
  setTimeout(() => {
    hideSpinner($("#btnSpin2"));
    $("#container-jobs").innerHTML = "";
    searchCategory($("#categoriesFilters").value);
  }, 2000);
});

const searchSeniority = (seniority) => {
  fetch(
    `https://638152199440b61b0d15c5d8.mockapi.io//jobs?seniority=${seniority}`
  )
    .then((res) => res.json())
    .then((data) => listJobs(data));
};

$("#btnSearchJob").addEventListener("click", () => {
  showSpinner($("#btnSpin2"));
  setTimeout(() => {
    hideSpinner($("#btnSpin2"));
    $("#container-jobs").innerHTML = "";
    searchSeniority($("#seniorityFilters").value);
  }, 2000);
});

$("#btnClean").addEventListener("click", () => {
  $("#container-jobs").innerHTML = "";
  $("#categoriesFilters").selectedIndex = 0;
  $("#seniorityFilters").selectedIndex = 0;
  $("#locationFilters").selectedIndex = 0;
  getJobs();
});

//Reset filters

$("#locationFilters").addEventListener("change", () => {
  $("#categoriesFilters").selectedIndex = 0;
  $("#seniorityFilters").selectedIndex = 0;
});

$("#categoriesFilters").addEventListener("change", () => {
  $("#locationFilters").selectedIndex = 0;
  $("#seniorityFilters").selectedIndex = 0;
});

$("#seniorityFilters").addEventListener("change", () => {
  $("#locationFilters").selectedIndex = 0;
  $("#categoriesFilters").selectedIndex = 0;
});

//Buttons

$("#showJobs").addEventListener("click", () => {
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.add("hidden");
  $("#filters").classList.remove("hidden");
  $("#testimonials").classList.remove("hidden");
  getJobs();
});

$("#showJobsMobile").addEventListener("click", () => {
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.add("hidden");
  $("#filters").classList.remove("hidden");
  $("#testimonials").classList.remove("hidden");
  getJobs();
});

$("#testimonials-btn").addEventListener("click", () => {
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.add("hidden");
  $("#filters").classList.remove("hidden");
  $("#testimonials").classList.remove("hidden");
  getJobs();
});

$("#showFormMobile").addEventListener("click", () => {
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.remove("hidden");
  $("#container-jobs").classList.add("hidden");
  $("#filters").classList.add("hidden");
  $("#testimonials").classList.add("hidden");
  $("#submitEdit").classList.add("hidden");
  isSubmit = true;
});

$("#logo").addEventListener("click", () => {
  $("#btnSpin").innerHTML = "";
  $("#container-jobs").innerHTML = "";
  $("#formEditJob").classList.add("hidden");
  $("#filters").classList.remove("hidden");
  $("#testimonials").classList.remove("hidden");
  getJobs();
});
