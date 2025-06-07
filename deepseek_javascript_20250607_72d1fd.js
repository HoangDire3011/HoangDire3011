const container = document.getElementById('space-container');
const elements = [];

// Danh sách nội dung ngẫu nhiên
const contents = [
    { type: 'text', content: '⭐' },
    { type: 'text', content: '🌌' },
    { type: 'text', content: '🚀' },
    { type: 'text', content: 'Chào mừng đến không gian!' },
    { type: 'text', content: 'Vũ trụ bí ẩn' },
    { type: 'image', src: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Ngôi+Sao' },
    { type: 'image', src: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Thiên+Hà' }
];

function createRandomElement() {
    // Chọn ngẫu nhiên nội dung
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    const element = document.createElement('div');
    
    if (randomContent.type === 'text') {
        element.className = 'space-element text-element';
        element.textContent = randomContent.content;
        element.style.fontSize = `${Math.random() * 30 + 15}px`;
    } else {
        element.className = 'space-element image-element';
        const img = document.createElement('img');
        img.src = randomContent.src;
        element.appendChild(img);
    }
    
    // Vị trí ngẫu nhiên trong không gian 3D
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const posZ = Math.random() * 1000 - 500;
    
    element.style.left = `${posX}px`;
    element.style.top = `${posY}px`;
    element.style.transform = `translateZ(${posZ}px)`;
    
    container.appendChild(element);
    elements.push(element);
    
    // Tự động xóa sau 5-10 giây
    setTimeout(() => {
        element.remove();
        elements.splice(elements.indexOf(element), 1);
    }, 5000 + Math.random() * 5000);
}

// Tạo phần tử mới mỗi giây
setInterval(createRandomElement, 1000);

// Cập nhật vị trí khi di chuột
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
    
    elements.forEach(el => {
        const z = parseFloat(el.style.transform.match(/translateZ\(([^)]+)\)/)[1]);
        const moveX = mouseX * (z / 1000);
        const moveY = mouseY * (z / 1000);
        
        el.style.transform = `translateZ(${z}px) translate(${moveX}px, ${moveY}px)`;
    });
});