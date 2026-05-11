// 모달을 위한 JavaScript 코드
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 이미지인지 비디오인지 확인
            if (this.tagName.toLowerCase() === 'img') {
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
                modalImage.src = this.src;
            } else if (this.tagName.toLowerCase() === 'video') {
                modalImage.style.display = 'none';
                modalVideo.style.display = 'block';
                const source = this.querySelector('source').src;
                modalVideo.src = source;
                modalVideo.load(); // 비디오 로드
                modalVideo.play(); // 자동 재생
            }
            modal.style.display = 'flex';
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalImage.src = '';
        modalVideo.pause();
        modalVideo.src = '';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            modalImage.src = '';
            modalVideo.pause();
            modalVideo.src = '';
        }
    });

    // ESC 키을 누르면 모달 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
            modalImage.src = '';
            modalVideo.pause();
            modalVideo.src = '';
        }
    });
});


window.addEventListener('scroll', function() {
    const background = document.querySelector('.background-image');
    if (!background) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = 500;
    const scale = 1 + (scrollTop / maxScroll) * 1.5;
    const newScale = Math.min(Math.max(scale, 1), 1.5);

    background.style.transform = `scale(${newScale})`;
});