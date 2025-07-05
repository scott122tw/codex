document.addEventListener('DOMContentLoaded', () => {
    let questions = [];
    let current = 0;
    let score = 0;

    const chat = document.getElementById('chat');
    const optionsDiv = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');

    fetch('questions.json')
        .then(res => res.json())
        .then(data => {
            questions = data.questions;
            showQuestion();
        });

    function showQuestion() {
        const q = questions[current];
        chat.textContent = q.question;
        optionsDiv.innerHTML = '';
        q.options.forEach(opt => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = opt;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            optionsDiv.appendChild(label);
            optionsDiv.appendChild(document.createElement('br'));
        });
    }

    nextBtn.addEventListener('click', () => {
        const selected = document.querySelector('input[name=answer]:checked');
        if (!selected) {
            return;
        }
        if (selected.value === questions[current].answer) {
            score++;
        }
        current++;
        if (current < questions.length) {
            showQuestion();
        } else {
            chat.textContent = '';
            optionsDiv.innerHTML = '';
            nextBtn.disabled = true;
            document.getElementById('result').textContent =
                `You scored ${score} of ${questions.length}.`;
        }
    });
});
