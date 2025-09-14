document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.toggle-button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const decisionId = button.getAttribute('data-id');
                const content = document.getElementById(`decision-${decisionId}`);
                
                // إغلاق جميع العناصر الأخرى
                document.querySelectorAll('.decision-content').forEach(el => {
                    if (el !== content) {
                        el.classList.remove('show');
                    }
                });

                // تبديل العنصر الحالي
                content.classList.toggle('show');
            });
        });
    });