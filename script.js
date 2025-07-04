document.addEventListener('DOMContentLoaded', () => {
    fetch('questions.json')
        .then(res => res.json())
        .then(data => {
            const form = document.getElementById('quiz-form');
            data.questions.forEach((q, idx) => {
                const fieldset = document.createElement('fieldset');
                const legend = document.createElement('legend');
                legend.textContent = q.question;
                fieldset.appendChild(legend);
                q.options.forEach(opt => {
                    const label = document.createElement('label');
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `question${idx}`;
                    radio.value = opt;
                    label.appendChild(radio);
                    label.appendChild(document.createTextNode(opt));
                    fieldset.appendChild(label);
                    fieldset.appendChild(document.createElement('br'));
                });
                form.appendChild(fieldset);
            });
        });

    document
        .getElementById('submit-btn')
        .addEventListener('click', e => {
            e.preventDefault();
            fetch('questions.json')
                .then(res => res.json())
                .then(data => {
                    let score = 0;
                    data.questions.forEach((q, idx) => {
                        const selector = `input[name=question${idx}]:checked`;
                        const selected = document.querySelector(selector);
                        if (selected && selected.value === q.answer) {
                            score++;
                        }
                    });
                    document.getElementById('result').textContent =
                        `You scored ${score} of ${data.questions.length}.`;
                });
        });
});
