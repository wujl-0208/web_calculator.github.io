// script.js
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // 点击按钮时滚动到页面顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动
        });
    });
});