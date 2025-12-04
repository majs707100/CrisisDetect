const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const logoLink = document.querySelector('.logo-link');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// 사이드바 외부 클릭시 닫기
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// 페이지 네비게이션
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        item.classList.add('active');
        
        const pageId = item.getAttribute('data-page');
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
        
        window.location.hash = pageId;
    });
});

// 페이지 로드시 UR
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetNav = document.querySelector(`[data-page="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
});

// 반응형 
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }, 250);
});

// 메뉴 토글
menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

//  스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        const dashboardNav = document.querySelector('[data-page="dashboard"]');
        if (dashboardNav) {
            dashboardNav.classList.add('active');
        }
        
        const dashboardPage = document.getElementById('dashboard');
        if (dashboardPage) {
            dashboardPage.classList.add('active');
        }
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }

        window.location.hash = 'dashboard';
        
 
    });
}

// 로그 테스트
const Logs = [
    { time: "2025-11-25 09:30:15", camera: "image.png", status: "위험", detail: "쓰러짐 감지" },
    { time: "2025-11-25 09:30:15", camera: "image.png", status: "위험", detail: "쓰러짐 감지" },
    { time: "2025-11-25 09:30:15", camera: "image.png", status: "위험", detail: "쓰러짐 감지" },
    { time: "2025-11-25 09:30:15", camera: "image.png", status: "위험", detail: "쓰러짐 감지" },
    { time: "2025-11-25 09:30:15", camera: "image.png", status: "위험", detail: "쓰러짐 감지" },
];

function load_Logs(logs) {
    const logsTableBody = document.querySelector('#logs .logs-table tbody');
    if (!logsTableBody) return;

    logsTableBody.innerHTML = ''; 

    logs.forEach(log => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${log.time}</td>
            <td><img src="${log.camera}" class="log-camera-image"></td>
            <td><span class="status-${log.status.toLowerCase()}">${log.status}</span></td>
            <td>${log.detail}</td>
            <td>
                <button class="delete-log-btn">🗑️</button>
            </td>
        `;
        logsTableBody.appendChild(row);
    });
}

document.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-log-btn');
    
    if (deleteBtn) {
        const logRow = deleteBtn.closest('tr');
        
        if (logRow) {
            console.log("감지 로그 항목 삭제 요청됨.");
            logRow.remove(); 
        }
    }
});

window.addEventListener('load', () => {
    load_Logs(Logs);
});

// 캠 테스트
const webcamFeed = document.getElementById('webcam-feed');
const placeholderText = document.getElementById('placeholder-text');
function startWebcam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                webcamFeed.srcObject = stream;
                if (placeholderText) {
                    placeholderText.style.display = 'none';
                }
            })
            .catch(function(error) {
                if (placeholderText) {
                    placeholderText.textContent = "카메라 접근이 거부되었거나 장치를 찾을 수 없습니다.";
                }
            });
    } else {
        if (placeholderText) {
            placeholderText.textContent = "이 브라우저는 웹캠 기능을 지원하지 않습니다.";
        }
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        item.classList.add('active');
        
        const pageId = item.getAttribute('data-page');
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
        
        window.location.hash = pageId;
    });
});

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetNav = document.querySelector(`[data-page="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
    startWebcam(); 
});

// 팀 정보
const teamInfoButton = document.getElementById('teamInfoButton');
const teamMenu = document.getElementById('teamMenu');
const teamInfoWrapper = document.querySelector('.team-info-wrapper');

if (teamInfoButton && teamMenu) {
    teamInfoButton.addEventListener('click', (e) => {
        e.stopPropagation();
        teamMenu.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (teamMenu && teamInfoWrapper && !teamInfoWrapper.contains(e.target)) {
        teamMenu.classList.remove('active');
    }
});

// 구성원 테스트

const addContactForm = document.getElementById('addContactForm');
const contactList = document.getElementById('contactList');

if (addContactForm && contactList) {
    addContactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nameInput = document.getElementById('contact-name');
        const phoneInput = document.getElementById('contact-phone');

        const newName = nameInput.value;
        const newPhone = phoneInput.value;

        if (newName && newPhone) {

            const newItem = document.createElement('div');
            newItem.classList.add('contact-item');
            newItem.innerHTML = `
                <div class="contact-details">
                    <span class="contact-name">${newName}</span>
                    <span class="contact-phone">${newPhone}</span>
                </div>
                <button class="delete-contact-btn">🗑️</button>
            `;
            
            contactList.appendChild(newItem);

            nameInput.value = '';
            phoneInput.value = '';
        }
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-contact-btn')) {
        const contactItem = e.target.closest('.contact-item');
        if (contactItem) {
            const contactName = contactItem.querySelector('.contact-name').textContent;
            contactItem.remove(); 
        }
    }
});

//  차트 생성 테스트
function renderWeeklyStatusChart() {
    const ctx = document.getElementById('weekly-status-chart');
    if (!ctx) return; 

    const chartData = {
        labels: ['4일전', '3일전', '2일전', '1일전', '오늘'],
        datasets: [{
            label: '위험 (🚨)',
            data: [8, 3, 4, 1, 6],
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            stack: 'Stack 0',
        }, {
            label: '경고 (⚠️)',
            data: [1, 3, 8, 7, 2, 5],
            backgroundColor: 'rgba(255, 206, 86, 0.8)',
            stack: 'Stack 0',
        }, {
            label: '정상/안전 (🟢)',
            data: [10, 14, 12, 10, 7],
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            stack: 'Stack 0',
        }]
    };

 
    new Chart(ctx, {
        type: 'bar', 
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#FFFFFF' 
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#FFFFFF' }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '감지 횟수',
                        color: '#FFFFFF'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#FFFFFF' }
                }
            }
        }
    });
}


window.addEventListener('load', () => {

    if (typeof load_Logs !== 'undefined') {
        load_Logs(Logs);
    }
    
    renderWeeklyStatusChart(); 
});