/**
 * Global function to handle page navigation across the marketplace
 * This function replaces all instances of window.location.href for consistency.
 * @param {string} page The filename or URL of the page to open.
 */
function openPage(page) {
    window.location.href = page;
}

/**
 * Custom Alert Box function for non-blocking notifications.
 * @param {string} message - The text to display in the alert.
 * @param {string} type - 'success', 'info', or 'error' (determines color).
 */
function alertBox(message, type) {
    const existingAlert = document.getElementById('customAlert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.id = 'customAlert';
    alertDiv.textContent = message;

    // Set styles based on type
    let bgColor = '';
    if (type === 'success') bgColor = '#4CAF50';
    else if (type === 'info') bgColor = '#2196F3';
    else bgColor = '#f44336';

    // Check if body is ready to append.
    if (!document.body) {
        console.error("Document body not available for alertBox.");
        return;
    }
    
    alertDiv.style.cssText = `
        position: fixed;
        top: 130px; /* Below the two navbars on detailed pages */
        right: 20px;
        padding: 15px 30px;
        border-radius: 8px;
        background-color: ${bgColor};
        color: white;
        font-weight: 600;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 2000;
        transition: opacity 0.5s ease-in-out;
        opacity: 1;
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Buy/Sell Marketplace (buy-sell.html) Logic ---
    const sidebarBuySell = document.getElementById('needSidebar');
    const openBtnBuySell = document.getElementById('openNeedBtn');
    const itemCardsBuySell = document.querySelectorAll('.item-card');
    const modalBuySell = document.getElementById('itemDetailModal');
    const closeModalBtnBuySell = document.getElementById('closeModalBtn');
    const modalItemNameBuySell = document.getElementById('modalItemName');
    const modalItemPriceBuySell = document.getElementById('modalItemPrice');
    const modalItemDescBuySell = document.getElementById('modalItemDesc');
    const modalItemConditionBuySell = document.getElementById('modalItemCondition');

    if (openBtnBuySell && sidebarBuySell) {
        openBtnBuySell.addEventListener('click', () => {
            sidebarBuySell.classList.add('open');
            setTimeout(() => {
                openPage('sell.item.html'); 
            }, 400); 
        });
    }

    if (modalBuySell) {
        itemCardsBuySell.forEach(card => {
            card.addEventListener('click', () => {
                const itemName = card.getAttribute('data-name');
                const itemPriceHtml = card.getAttribute('data-price');
                const itemDesc = card.getAttribute('data-desc');
                const itemCondition = card.getAttribute('data-condition');

                // Update the modal content
                modalItemNameBuySell.textContent = itemName;
                modalItemPriceBuySell.innerHTML = itemPriceHtml;
                modalItemDescBuySell.textContent = itemDesc;
                modalItemConditionBuySell.textContent = itemCondition;
                
                // Show the modal
                modalBuySell.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        closeModalBtnBuySell.addEventListener('click', () => {
            modalBuySell.classList.remove('active');
            document.body.style.overflow = ''; 
        });
        
        modalBuySell.addEventListener('click', (e) => {
            if (e.target === modalBuySell) {
                modalBuySell.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Lend/Borrow Marketplace (lend-borrow.html) Logic ---
    const sidebarLendBorrow = document.getElementById('needSidebar');
    const openBtnLendBorrow = document.getElementById('openNeedBtn');
    const itemCardsLendBorrow = document.querySelectorAll('.item-card');
    const modalLendBorrow = document.getElementById('itemDetailModal');
    const closeModalBtnLendBorrow = document.getElementById('closeModalBtn');
    const modalItemNameLendBorrow = document.getElementById('modalItemName');
    const modalItemPriceLendBorrow = document.getElementById('modalItemPrice');

    if (openBtnLendBorrow && sidebarLendBorrow) {
        openBtnLendBorrow.addEventListener('click', () => {
            sidebarLendBorrow.classList.add('open');
            setTimeout(() => {
                openPage('need-request.html'); 
            }, 400); 
        });
    }

    if (modalLendBorrow) {
        itemCardsLendBorrow.forEach(card => {
            card.addEventListener('click', () => {
                const itemName = card.getAttribute('data-name');
                const itemPriceHtml = card.getAttribute('data-price');

                // Update the modal content
                modalItemNameLendBorrow.textContent = itemName;
                modalItemPriceLendBorrow.innerHTML = itemPriceHtml;
                
                // Show the modal
                modalLendBorrow.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModalBtnLendBorrow.addEventListener('click', () => {
            modalLendBorrow.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modalLendBorrow.addEventListener('click', (e) => {
            if (e.target === modalLendBorrow) {
                modalLendBorrow.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // --- Post Borrow Request (need-request.html) Logic ---
    const needForm = document.querySelector('.need-form');
    const needFormContainer = document.getElementById('needFormContainer');

    // Function to toggle the borrow form modal
    window.toggleForm = (show) => {
        if (show) {
            needFormContainer.style.display = 'flex';
            setTimeout(() => {
                needFormContainer.classList.add('active');
            }, 10);
        } else {
            needFormContainer.classList.remove('active');
            setTimeout(() => {
                needFormContainer.style.display = 'none';
            }, 300);
        }
    }
    
    if (needForm) {
        needForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            alertBox('Borrow Request Submitted! Lenders will be notified.', 'success');
            
            needForm.reset();
            window.toggleForm(false); 
        });
    }

    // --- Post Sell Item (sell.item.html) Logic ---
    const sellForm = document.querySelector('.sell-form');
    const sellFormContainer = document.getElementById('sellFormContainer');

    // Function to toggle the sell form modal
    window.toggleFormSell = (show) => {
        if (show) {
            sellFormContainer.style.display = 'flex';
            setTimeout(() => {
                sellFormContainer.classList.add('active');
            }, 10);
        } else {
            sellFormContainer.classList.remove('active');
            setTimeout(() => {
                sellFormContainer.style.display = 'none';
            }, 300);
        }
    }
    
    // Alias the correct toggle function for the button in sell.item.html
    const postSellBtn = document.querySelector('.post-btn[onclick="toggleForm(true)"]');
    if(postSellBtn) {
        postSellBtn.setAttribute('onclick', 'toggleFormSell(true)');
    }
    const closeSellBtn = document.querySelector('.form-content .close-btn[onclick="toggleForm(false)"]');
    if(closeSellBtn) {
        closeSellBtn.setAttribute('onclick', 'toggleFormSell(false)');
    }


    if (sellForm) {
        sellForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            alertBox('Item Listing Submitted! Buyers will be able to see it.', 'success');
            
            sellForm.reset();
            window.toggleFormSell(false); 
        });
    }
});
