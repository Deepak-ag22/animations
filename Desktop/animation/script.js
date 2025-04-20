document.addEventListener('DOMContentLoaded', () => {
    const wishItems = document.querySelectorAll('.wish-item');
    const modal = document.getElementById('wishModal');
    const modalContent = document.getElementById('wishContent');
    const closeModalBtn = modal.querySelector('.close-btn');
    const giftCardBtn = document.getElementById('giftCardBtn');
    const giftCardSection = document.getElementById('giftCardSection');
    const closeGiftCardBtn = document.getElementById('closeGiftCardBtn');

    // Placeholder Wish Data (Replace with your actual wishes and image paths)
    const wishes = {
        1: {
            title: "Sparkling Joy!",
            message: "Wishing you a day as sparkly and joyful as you are! Hope it's filled with laughter and fun.",
            image: "images/sparkle.gif" // Example: Path to a relevant image or GIF
        },
        2: {
            title: "Wonderful Year Ahead!",
            message: "May the coming year be packed with amazing adventures, success, and all your heart desires!",
            image: "images/adventure.gif"
        },
        3: {
            title: "Sweetest Birthday!",
            message: "Sending you the sweetest wishes for a birthday that's as lovely and wonderful as you!",
            image: "images/cake.gif"
        },
        4: {
            title: "Dream Big!",
            message: "Never stop dreaming, Zara! May all your biggest dreams start coming true this year.",
            image: "images/dreams.gif"
        },
        5: {
            title: "Cheers to You!",
            message: "Raising a toast to you, Zara! For your kindness, your spirit, and just for being you! Happy Birthday!",
            image: "images/cheers.gif"
        },
        6: {
            title: "So Much Love!",
            message: "Sending you tons and tons of love on your special day. You are cherished!",
            image: "images/hearts.gif"
        }
    };

    // --- Wish Modal Logic --- 

    wishItems.forEach(item => {
        item.addEventListener('click', () => {
            const wishId = item.getAttribute('data-wish');
            const wishData = wishes[wishId];

            if (wishData) {
                modalContent.innerHTML = `
                    <h3>${wishData.title}</h3>
                    <img src="${wishData.image}" alt="${wishData.title}" style="max-width: 80%; height: auto; margin-bottom: 15px; border-radius: 8px;">
                    <p>${wishData.message}</p>
                `;
                modal.style.display = 'block';
            } else {
                modalContent.innerHTML = `<p>Something went wrong, but sending happy vibes anyway!</p>`;
                modal.style.display = 'block';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- Gift Card Logic --- 

    giftCardBtn.addEventListener('click', () => {
        giftCardSection.classList.remove('hidden');
        // Reset to the first page when opening
        goToPage(0);
    });

    closeGiftCardBtn.addEventListener('click', () => {
        giftCardSection.classList.add('hidden');
    });

    // --- Gift Card Book/Page Flip Logic --- 
    const pages = document.querySelectorAll('.book .page');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    let currentPageIndex = 0;
    const totalPages = pages.length;

    function updatePageStyles() {
        pages.forEach((page, index) => {
            page.classList.remove('active', 'flipped');
            // Z-index logic for stacking: higher index for pages closer to the front
            page.style.zIndex = totalPages - index;
            
            if (index < currentPageIndex) {
                // Pages before the current one are flipped
                page.classList.add('flipped');
                 page.style.transform = 'rotateY(-180deg)';
            } else {
                 page.style.transform = 'rotateY(0deg)';
            }
        });
        // Ensure the current page is visually on top if needed (CSS might handle this)
        if (pages[currentPageIndex]) {
             pages[currentPageIndex].classList.add('active');
             pages[currentPageIndex].style.zIndex = totalPages + 1; // Ensure it's above others
        }
    }

    function goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            currentPageIndex = pageIndex;
            updatePageStyles();

            // Update button states
            prevPageBtn.disabled = currentPageIndex === 0;
            nextPageBtn.disabled = currentPageIndex === totalPages - 1;
        }
    }

    nextPageBtn.addEventListener('click', () => {
        if (currentPageIndex < totalPages - 1) {
            goToPage(currentPageIndex + 1);
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
             goToPage(currentPageIndex - 1);
        }
    });

    // Initial setup
    goToPage(0);
}); 