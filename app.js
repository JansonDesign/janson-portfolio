const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

const homeFeatured = document.querySelector("#home-featured");
if (homeFeatured) {
  const featuredWorks = [
    { work: works.find(item => item.name === "江河"), image: 2 },
    { work: works.find(item => item.name === "观瀑"), image: 3 },
    { work: works.find(item => item.name === "四大名著"), image: 2 }
  ];
  homeFeatured.innerHTML = featuredWorks.map(({ work, image }) => `
    <a href="project.html?id=${work.id}" aria-label="查看${work.name}">
      <img src="assets/works/${work.fileBase}${image}.jpg" alt="${work.name}" loading="eager">
    </a>
  `).join("");
}

const worksGrid = document.querySelector("#works-grid");
if (worksGrid) {
  worksGrid.innerHTML = works.map(work => `
    <a class="work-card reveal" href="project.html?id=${work.id}">
      <img src="assets/works/${work.fileBase}1.jpg" alt="${work.name}设计案例" loading="lazy">
      <div class="work-caption">
        <h2>${work.name}</h2>
        <p>${work.category} / ${work.year}</p>
      </div>
    </a>
  `).join("");
}

const projectGallery = document.querySelector("#project-gallery");
if (projectGallery) {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id")) || 1;
  const work = works.find(item => item.id === id) || works[0];
  const index = works.indexOf(work);
  const previous = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  document.title = `${work.name} | 个人设计库`;
  document.querySelector("#project-name").textContent = work.name;
  document.querySelector("#project-category").textContent = work.category;
  document.querySelector("#project-year").textContent = work.year;
  document.querySelector("#project-number").textContent = String(work.id).padStart(2, "0");
  projectGallery.innerHTML = [1, 2, 3].map(number => `
    <figure class="reveal">
      <img src="assets/works/${work.fileBase}${number}.jpg" alt="${work.name}展示图 ${number}">
    </figure>
  `).join("");
  document.querySelector("#project-prev").href = `project.html?id=${previous.id}`;
  document.querySelector("#project-prev").textContent = `← ${previous.name}`;
  document.querySelector("#project-next").href = `project.html?id=${next.id}`;
  document.querySelector("#project-next").textContent = `${next.name} →`;
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
