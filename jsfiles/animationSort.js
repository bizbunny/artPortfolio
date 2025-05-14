$(document).ready(function() {
    // Get filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
  
    // Set initial active state
    updateActiveStates(urlFilter || 'all');
    
    // Apply initial filter if specified
    if (urlFilter) {
        applyFilter(urlFilter);
    }
  
    // Handle filter button clicks
    $(".nav-item[data-filter]").click(function(e) {
        e.preventDefault();
        const filterValue = $(this).attr("data-filter");
        
        // Update URL without page reload
        const newUrl = filterValue === 'all' 
            ? '/index.html' 
            : `/index.html?filter=${filterValue}`;
        history.pushState(null, null, newUrl);
        
        // Apply filter and update active states
        applyFilter(filterValue);
        updateActiveStates(filterValue);
    });
  
    // Scroll to top smoothly to prevent jump
    $('html, body').animate({scrollTop: 0}, 200);
});

    // Handle browser navigation
    window.addEventListener('popstate', function() {
        const newParams = new URLSearchParams(window.location.search);
        const newFilter = newParams.get('filter') || 'all';
        applyFilter(newFilter);
        updateActiveStates(newFilter);
    });
  
    //filter function with immediate reordering
    function applyFilter(filterValue) {
        // Disable transitions temporarily
        $(".filter").css('transition', 'none');
        
        // Hide all items first
        $(".filter").slideUp(); // lowercase
        
        if (filterValue === "all") {
            $(".filter").slideDown(); // lowercase
        } else {
            $(`.filter.${filterValue}`).slideDown(); // lowercase
        }
        
        // Reorder items without animation
        reorderGrid();
        
        // Re-enable transitions after a small delay
        setTimeout(() => {
            $(".filter").css('transition', '');
        }, 10);
    }
    
    //grid reordering function
    function reorderGrid() {
        const $grid = $("#project-grid .row");
        const $visibleItems = $grid.find(".filter:visible").detach();
        
        // Reattach visible items in original order
        $grid.append($visibleItems);
    }
  
    // Update active navigation states
    function updateActiveStates(activeFilter) {
        $(".nav-item").removeClass('active');
        $(`.nav-item[data-filter="${activeFilter}"]`).addClass('active');
    }
  //});