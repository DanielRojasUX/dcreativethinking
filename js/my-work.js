document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".js-grid");
  const tabsList = document.querySelector(".js-tabs-list");
  const swapBtn = document.querySelector(".js-swap");
  
  // We use `let` here so we can update the references when we clone the buttons
  let moreBtnBottom = document.querySelector(".js-more-bottom");
  let moreBtnTop = document.querySelector(".js-more-top");
  
  // Mobile Tabs elements
  const tabsContainer = document.querySelector(".js-tabs");
  const tabsTrigger = document.querySelector(".js-tabs-trigger");
  const mobileLabel = document.querySelector(".js-tabs-trigger-label");
  
  if (!grid) return;

  let currentFilter = "all";

  // 1. Fetch the data from your JSON file (Cache bypassed!)
  fetch("mywork.json", { cache: "no-store" })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      renderTabs(data);
      renderCards(data);
      initializeBehaviors();
    })
    .catch(error => console.error("Error loading mywork.json:", error));

  // 2. Render Tabs dynamically based on JSON data
  function renderTabs(projects) {
    if (!tabsList) return;
    
    const uniqueTabs = new Set();
    
    projects.forEach(project => {
      const tags = project.tabs || project.category || [];
      const tagsArray = Array.isArray(tags) ? tags : tags.split(" ");
      
      tagsArray.forEach(tag => {
          if (tag.trim() !== "") uniqueTabs.add(tag.trim());
      });
    });

    tabsList.innerHTML = "";
    let isFirst = true;

    uniqueTabs.forEach(tab => {
      if (isFirst) {
        currentFilter = tab; 
      }
      
      const activeClass = isFirst ? "is-active" : "";
      tabsList.insertAdjacentHTML('beforeend', `<button class="my-work__tab ${activeClass}" type="button" data-filter="${tab}">${tab.toUpperCase()}</button>`);
      
      isFirst = false;
    });

    tabsList.insertAdjacentHTML('beforeend', `<button class="my-work__tab" type="button" data-filter="all">ALL</button>`);
    
    if (mobileLabel && currentFilter !== "all") {
        mobileLabel.textContent = currentFilter.toUpperCase();
    }
  }

  // 3. Render HTML dynamically
  function renderCards(projects) {
    grid.innerHTML = ""; 
    projects.forEach(project => {
      
      // Setup tooltip wrapper for glyphs (Robust: handles both Strings and Objects)
      const badgesHtml = (project.badges || []).map(badge => {
        const imgSrc = typeof badge === 'object' ? badge.src : badge;
        const tooltipLabel = typeof badge === 'object' ? badge.label : "";
        const tooltipAttr = tooltipLabel ? `data-tooltip="${tooltipLabel}"` : "";

        return `
          <div class="card__glyph-wrapper" ${tooltipAttr}>
             <img class="card__glyph" src="assets/img/${imgSrc}" alt="${tooltipLabel}">
          </div>
        `;
      }).join('');

      const tags = project.tabs || project.category || [];
      const catString = Array.isArray(tags) ? tags.join(" ") : tags;

      const cardHtml = `
        <a href="usecases/${project.slug}.html" class="card" data-category="${catString.toLowerCase()}">
          <div class="card__badges">
            ${badgesHtml}
          </div>
          <figure class="card__figure">
            <img class="card__illustration" src="assets/img/${project.illustration}" alt="${project.title} illustration">
          </figure>
          <div class="card__hero">
            <picture class="card__hero-media">
              <img class="card__hero-img" src="assets/img/${project.heroImg}" alt="">
            </picture>
            <img class="card__logo" src="assets/img/${project.brandLogo}" alt="${project.org}">
          </div>
          <div class="card__body">
            <h3 class="card__title">${project.title}</h3>
            <p class="card__desc">${project.desc}</p>
            <hr class="card__rule">
            <dl class="card__meta">
              <div><span class="card__meta-label">ORG.:</span> ${project.org}</div>
              <div><span class="card__meta-label">ROLE.:</span> ${project.role}</div>
            </dl>
          </div>
        </a>
      `;
      grid.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  // 4. Setup interactions after elements are rendered
  function initializeBehaviors() {
    const cards = Array.from(grid.querySelectorAll(".card"));
    const dynamicallyGeneratedTabs = document.querySelectorAll(".my-work__tab");
    let isExpanded = false;

    // --- TAB FILTER & VIEW MORE LOGIC ---
    const updateVisibility = () => {
      // Dynamic Limit: 4 for Desktop (1080px+), 3 for Tablet/Mobile
      const defaultLimit = window.innerWidth >= 1080 ? 4 : 3;
      
      const matchingCards = cards.filter(card => {
         const cardCats = (card.getAttribute("data-category") || "").toLowerCase();
         return currentFilter.toLowerCase() === "all" || cardCats.includes(currentFilter.toLowerCase());
      });

      cards.forEach(card => card.style.display = "none");

      matchingCards.forEach((card, index) => {
         if (isExpanded || index < defaultLimit) {
            card.style.display = "";
         }
      });

      const btnText = isExpanded ? "collapse" : "expand";
      const shouldEnableButtons = matchingCards.length > defaultLimit;

      // Bottom Chevron Button
      if (moreBtnBottom) {
          const bottomLabel = moreBtnBottom.querySelector(".js-expand-label");
          if (bottomLabel) bottomLabel.textContent = btnText;
          
          const icon = moreBtnBottom.querySelector('.my-work__expand-icon');
          if(icon) {
             icon.style.transform = isExpanded ? 'rotate(180deg)' : '';
             if (icon.tagName.toLowerCase() === 'img') icon.src = "assets/img/expand-colapse.svg";
          }
          
          if (shouldEnableButtons) {
              moreBtnBottom.removeAttribute("aria-disabled");
              moreBtnBottom.style.display = ""; 
          } else {
              moreBtnBottom.setAttribute("aria-disabled", "true");
              moreBtnBottom.style.display = "none"; // Bottom chevron usually hides entirely when disabled
          }
      }

      // Top Expand Button
      if (moreBtnTop) {
        const topLabel = moreBtnTop.querySelector(".js-more-top-label");
        if (topLabel) topLabel.textContent = btnText;
        
        const icon = moreBtnTop.querySelector('.my-work__toolbar-icon');
        if (icon) {
           icon.style.transform = isExpanded ? 'rotate(180deg)' : '';
           if (icon.tagName.toLowerCase() === 'img') icon.src = "assets/img/expand-colapse.svg";
        }
        
        if (shouldEnableButtons) {
            moreBtnTop.removeAttribute("aria-disabled");
            moreBtnTop.style.display = ""; 
        } else {
            moreBtnTop.setAttribute("aria-disabled", "true");
            moreBtnTop.style.display = ""; // Stays visible, but grayed out via CSS
        }
      }
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility); 

    const toggleView = (e) => {
      // Prevent clicking if the button is grayed out/disabled
      if (e.currentTarget.getAttribute("aria-disabled") === "true") return;
      isExpanded = !isExpanded;
      updateVisibility();
    };

    // Safely attach View More events and update our DOM references
    if (moreBtnBottom) {
        const newBtn = moreBtnBottom.cloneNode(true);
        moreBtnBottom.parentNode.replaceChild(newBtn, moreBtnBottom);
        moreBtnBottom = newBtn; // Update the reference so updateVisibility controls the active node
        moreBtnBottom.addEventListener("click", toggleView);
    }
    if (moreBtnTop) {
        const newBtn = moreBtnTop.cloneNode(true);
        moreBtnTop.parentNode.replaceChild(newBtn, moreBtnTop);
        moreBtnTop = newBtn; // Update the reference so updateVisibility controls the active node
        moreBtnTop.addEventListener("click", toggleView);
    }

    // --- TAB CLICK LOGIC ---
    dynamicallyGeneratedTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            dynamicallyGeneratedTabs.forEach(t => t.classList.remove("is-active"));
            tab.classList.add("is-active");

            if(mobileLabel) mobileLabel.textContent = tab.textContent;
            if(tabsContainer) tabsContainer.classList.remove("is-open");

            currentFilter = tab.getAttribute("data-filter");
            isExpanded = false; 
            updateVisibility(); 
        });
    });

    if (tabsTrigger && tabsContainer) {
        const newTrigger = tabsTrigger.cloneNode(true);
        tabsTrigger.parentNode.replaceChild(newTrigger, tabsTrigger);
        newTrigger.addEventListener("click", () => {
            tabsContainer.classList.toggle("is-open");
        });
    }

    // --- SWAP VIEW LOGIC ---
    if (swapBtn) {
        const newSwapBtn = swapBtn.cloneNode(true);
        swapBtn.parentNode.replaceChild(newSwapBtn, swapBtn);
        
        newSwapBtn.addEventListener("click", () => {
            const isPressed = newSwapBtn.getAttribute("aria-pressed") === "true";
            newSwapBtn.setAttribute("aria-pressed", !isPressed);
            
            const allCards = grid.querySelectorAll(".card");
            allCards.forEach(card => card.classList.toggle("card--brand", !isPressed));
        });
    }
  }
});