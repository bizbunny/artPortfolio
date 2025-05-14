function loadHeader() {
    fetch("/pages/header.html")  // Use absolute path
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load header");
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        initHeaderScripts();
      })
      .catch(error => {
        console.error("Error loading header:", error);
      });
}
  
  document.addEventListener('DOMContentLoaded', loadHeader);
  function initHeaderScripts() {
    // Check if we're on the index page with a filter
    const currentPage = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');

    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href').split('?')[0] === currentPage) {
            link.classList.add('active');
            link.closest('.nav-item').classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Highlight the correct nav item
    if (currentPage === '/index.html' && urlFilter) {
        document.querySelectorAll('.button').forEach(button => {
            if (button.getAttribute('data-filter') === urlFilter) {
                button.classList.add('active');
            }
        });
    }
    
    //TYPING ANIMATION
    function typing_animation() {
        let text_element = document.querySelector(".text-anim");
        let text_array = text_element.innerHTML.split("");
        let text_array_slice = text_element.innerHTML.split(" ");
        let text_len = text_array.length;

        const word_len = text_array_slice.map((word) => {
            return word.length;
        })

        console.log(word_len);

        let timings = {
            easing: `steps(${Number(word_len[0] + 1)}, end)`,
            delay: 900,
            duration: 2000,
            fill: 'forwards'
        }

        let cursor_timings = {
            duration: 800,
            iterations: Infinity,
            easing: 'cubic-bezier(0,.26,.44,.93)'
        }

        document.querySelector(".text_cursor").animate([
            {
                opacity: 0
            },
            {
                opacity: 0, offset: 0.7
            },
            {
                opacity: 1
            }
        ], cursor_timings);

        if (text_array_slice.length == 1) {
            timings.easing = `steps(${Number(word_len[0])}, end)`;

            let reveal_animation = document.querySelector(".text_hide").animate([
                { left: '0%' },
                { left: `${(100 / text_len) * (word_len[0])}%` }
            ], timings);

            document.querySelector(".text_cursor").animate([
                { left: '0%' },
                { left: `${(100 / text_len) * (word_len[0])}%` }
            ], timings);

            reveal_animation.onfinish = () => {
                setTimeout(() => {
                    document.querySelector('.text_hide').animate([
                        {left: '0%'}
                    ], {
                        duration: 2000,
                        easing: 'cubic-bezier(.73,0,.38,.88)'
                    });
                    document.querySelector('.text_cursor').animate([
                        {left: '0%'}
                    ], {
                        duration: 2000,
                        easing: 'cubic-bezier(.73,0,.38,.88)'
                    });
                    typing_animation();
                }, 1000);
            }
        } else {
            document.querySelector(".text_hide").animate([
                { left: '0%' },
                { left: `${(100 / text_len) * (word_len[0] + 1)}%` }
            ], timings);

            document.querySelector(".text_cursor").animate([
                { left: '0%' },
                { left: `${(100 / text_len) * (word_len[0] + 1)}%` }
            ], timings);
        }


        for (let i = 1; i < text_array_slice.length; i++) {
            console.log(word_len);
            console.log(text_array_slice.length);
            const single_word_len = word_len[i];
            console.log(single_word_len);

            if (i == 1) {
                var left_instance = (100 / text_len) * (word_len[i - 1] + 1);
                console.log(left_instance);
            }

            let timings_2 = {
                easing: `steps(${Number(single_word_len + 1)}, end)`,
                delay: (1.2 * (i + 1) + (1.2 * i)) * (1000),
                //delay: (2 * (i + 1) + (2 * i)) * (1000),
                // delay: ((i*2)-1)*1000,
                duration: 2000,
                fill: 'forwards'
            }

            if (i == (text_array_slice.length - 1)) {
                timings_2.easing = `steps(${Number(single_word_len)}, end)`;
                let reveal_animation = document.querySelector(".text_hide").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len) * (word_len[i]))}%` }
                ], timings_2);

                document.querySelector(".text_cursor").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len) * (word_len[i]))}%` }
                ], timings_2);

                reveal_animation.onfinish = () => {
                    setTimeout(() => {
                        document.querySelector('.text_hide').animate([
                            {left: '0%'}
                        ], {
                            duration: 2000,
                            easing: 'cubic-bezier(.73,0,.38,.88)'
                        });
                        document.querySelector('.text_cursor').animate([
                            {left: '0%'}
                        ], {
                            duration: 2000,
                            easing: 'cubic-bezier(.73,0,.38,.88)'
                        });
                        typing_animation();
                    }, 1000);
                }
            } else {
                document.querySelector(".text_hide").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len) * (word_len[i] + 1))}%` }
                ], timings_2);

                document.querySelector(".text_cursor").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len) * (word_len[i] + 1))}%` }
                ], timings_2);
            }

            left_instance = left_instance + ((100 / text_len) * (word_len[i] + 1));
        }
        if (!document.querySelector(".text-anim")) {
            console.warn("Typing animation elements not found");
            return;
        }
    }
    typing_animation();
  }  