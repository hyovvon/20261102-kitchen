// =========================================
// MOMO KITCHEN QR 메뉴판 JavaScript
// 메뉴 데이터, 카테고리 필터, 주문 팝업을 관리합니다.
// =========================================

// 메뉴 정보는 이 배열에서 쉽게 수정할 수 있습니다.
const menus = [
  { id: 1, name: "토마토 바질 파스타", category: "파스타", price: 13000,
    description: "신선한 토마토와 바질이 어우러진 모모키친 대표 파스타입니다.",
    allergy: "밀 함유", tag: "BEST", image: "assets/pasta.jpg" },
  { id: 2, name: "트러플 크림 리조또", category: "리조또", price: 15000,
    description: "고소한 크림과 트러플 향이 가득한 프리미엄 리조또입니다.",
    allergy: "우유 함유", tag: "POPULAR", image: "assets/risotto.jpg" },
  { id: 3, name: "마르게리타 피자", category: "피자", price: 18000,
    description: "신선한 토마토, 모짜렐라, 바질의 조화가 돋보이는 피자입니다.",
    allergy: "밀·우유 함유", tag: "", image: "assets/pizza.jpg" },
  { id: 4, name: "리코타 샐러드", category: "샐러드", price: 12000,
    description: "신선한 채소와 리코타 치즈로 만든 가벼운 한 끼입니다.",
    allergy: "우유·견과류 함유", tag: "FRESH", image: "assets/salad.jpg" }
];

// 숫자를 13,000원 형식으로 바꾸는 함수
function formatPrice(price) {
  return price.toLocaleString("ko-KR") + "원";
}

// 메뉴 카드를 화면에 출력하는 함수
function renderMenus(category = "전체") {
  const menuGrid = document.getElementById("menuGrid");

  // 선택한 카테고리에 맞는 메뉴만 골라냅니다.
  const filteredMenus = category === "전체"
    ? menus
    : menus.filter(menu => menu.category === category);

  // 메뉴 데이터를 HTML 카드로 변환합니다.
  menuGrid.innerHTML = filteredMenus.map(menu => `
    <article class="menu-card">
      <img class="menu-image" src="${menu.image}" alt="${menu.name}">
      <div class="menu-content">
        ${menu.tag ? `<span class="menu-tag">${menu.tag}</span>` : ""}
        <div class="menu-name-row">
          <span class="menu-name">${menu.name}</span>
          <span class="menu-price">${formatPrice(menu.price)}</span>
        </div>
        <p class="menu-desc">${menu.description}</p>
        <div class="menu-bottom">
          <span class="allergy">ⓘ ${menu.allergy}</span>
          <button class="order-button" data-menu-id="${menu.id}">주문하러 가기</button>
        </div>
      </div>
    </article>
  `).join("");

  // 새로 생성된 주문 버튼에 클릭 이벤트를 연결합니다.
  menuGrid.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
      const selectedMenu = menus.find(menu => menu.id === Number(button.dataset.menuId));
      openOrderPopup(selectedMenu);
    });
  });
}

// 주문 팝업 열기
function openOrderPopup(menu) {
  const modal = document.getElementById("orderModal");
  const summary = document.getElementById("orderSummary");

  // 선택한 메뉴의 이름과 가격을 팝업에 표시합니다.
  summary.innerHTML = `
    선택 메뉴: <strong>${menu.name}</strong><br>
    메뉴 가격: <strong>${formatPrice(menu.price)}</strong><br>
    알레르기 안내: ${menu.allergy}
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("modalClose").focus();
}

// 주문 팝업 닫기
function closeOrderPopup() {
  const modal = document.getElementById("orderModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

// 카테고리 버튼 클릭 이벤트
document.querySelectorAll(".category-tab").forEach(button => {
  button.addEventListener("click", () => {
    // 모든 버튼의 활성화 표시를 해제합니다.
    document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));

    // 클릭한 버튼만 활성화합니다.
    button.classList.add("active");

    // 선택한 카테고리의 메뉴를 다시 표시합니다.
    renderMenus(button.dataset.category);
  });
});

// 팝업 닫기 버튼 및 배경 클릭 이벤트
document.getElementById("modalClose").addEventListener("click", closeOrderPopup);
document.getElementById("orderModal").addEventListener("click", event => {
  if (event.target.id === "orderModal") closeOrderPopup();
});

// ESC 키를 눌러 팝업 닫기
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeOrderPopup();
});

// 처음 페이지가 열릴 때 전체 메뉴를 표시합니다.
renderMenus();
