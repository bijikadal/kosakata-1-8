const vocabList = [
  { korean: "어리다", indo: "Muda" },
  { korean: "다만", indo: "Namun" },
  { korean: "대부분", indo: "Biasanya" },
  { korean: "날씨", indo: "Cuaca" },
  { korean: "혼잡하다", indo: "Macet" },
  { korean: "대중교통", indo: "Transportasi umum" },
  { korean: "개인 승용차", indo: "Mobil pribadi" },
  { korean: "즐기다", indo: "Menikmati" },
  { korean: "휴식", indo: "Istirahat" },
  { korean: "하루 24 jam", indo: "Sehari" },
  { korean: "기상", indo: "Bangun tidur / cuaca / semangat" },
  { korean: "취침", indo: "Tidur (jadwal/pengumuman/formal)" },
  { korean: "일과", indo: "Jadwal (harian)" },
  { korean: "식료품", indo: "Bahan makanan" },
  { korean: "추가 할인을 받아", indo: "Mendapat diskon tambahan" },
  { korean: "또한", indo: "Selain itu" },
  { korean: "이루어지다", indo: "Terjadi" },
  { korean: "떠나다", indo: "Pergi" },
  { korean: "전경을 나타내다", indo: "Menunjukkan rasa hormat" },
  { korean: "공적 상황", indo: "Situasi resmi" },
  { korean: "구내식당", indo: "Kantin perusahaan" },
  { korean: "부서", indo: "Departemen" },
  { korean: "다지기 위해", indo: "Untuk memperkuat" },
  { korean: "쌓인 피로", indo: "Kelelahan yang menumpuk" },
  { korean: "어떤 사람", indo: "Beberapa orang" },
  { korean: "자기 개발", indo: "Pengembangan diri" },
  { korean: "통해", indo: "Melalui" },
  { korean: "직거래", indo: "Transaksi langsung" },
  { korean: "발달 공업", indo: "Industri yang berkembang" },
  { korean: "효율적", indo: "Efisien" },
  { korean: "양력", indo: "Kalender matahari" },
  { korean: "법정 공휴일", indo: "Hari libur resmi" },
  { korean: "새해 첫날", indo: "Hari tahun baru" },
  { korean: "종교", indo: "Kepercayaan / Agama" },
  { korean: "불교/부처", indo: "Buddha" },
  { korean: "현대", indo: "Modern" },
  { korean: "쓰이다", indo: "Dipakai" },
  { korean: "곱게", indo: "Dengan penampilan indah" },
  { korean: "단풍을 보기 위해", indo: "Untuk melihat daun musim gugur" },
  { korean: "봄맞이", indo: "Penyambutan musim semi" },
  { korean: "벚꽃", indo: "Bunga sakura" },
  { korean: "형형색", indo: "Berbagai warna" },
  { korean: "세계적 규모", indo: "Skala nasional/internasional" },
  { korean: "정부 기관", indo: "Lembaga pemerintah" },
  { korean: "광복절", indo: "Hari Kemerdekaan" },
  { korean: "국경일", indo: "Hari libur nasional" },
  { korean: "관문", indo: "Gerbang" },
  { korean: "주변", indo: "Sekitar" },
  { korean: "지나가", indo: "Lewat" },
  { korean: "높은 지대", indo: "Daerah yang tinggi" },
  { korean: "주선", indo: "Perkapalan" },
  { korean: "표시하다", indo: "Menunjukkan / Penandai" },
  { korean: "적히다", indo: "Tertulis" },
  { korean: "소통하다", indo: "Lancar / tersambung (komunikasi)" },
  { korean: "짧아진 것 같다고", indo: "Katanya menjadi lebih pendek" },
  { korean: "잠을 설치다", indo: "Tidur terganggu" },
  { korean: "밤에는 열대야로", indo: "Malam sangat panas (panas tropis)" },
  { korean: "뚜렷하다", indo: "Jelas terlihat" },
  { korean: "얼다", indo: "Membeku" },
  { korean: "현상", indo: "Fenomena" },
  { korean: "경치가", indo: "Pemandangan" },
  { korean: "받치다", indo: "Menyangga" },
  { korean: "깔다", indo: "Menyebar" },
  { korean: "순환시키는 방식", indo: "Cara mengalirkan" },
  { korean: "기준", indo: "Dasar acuan" },
  { korean: "과학", indo: "Ilmu pengetahuan" }
];

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function createQuiz() {
  const quizForm = document.getElementById("quizForm");
  const shuffled = shuffle([...vocabList]);

  shuffled.forEach((vocab, index) => {
    const askKorean = Math.random() < 0.5;
    let questionText, correctAnswer, choices;

    if (askKorean) {
      questionText = `Apa arti dari <strong>${vocab.korean}</strong>?`;
      correctAnswer = vocab.indo;
      choices = [vocab.indo, ...shuffle(vocabList.filter(v => v.indo !== vocab.indo)).slice(0, 3).map(v => v.indo)];
    } else {
      questionText = `Apa bahasa Korea dari <strong>${vocab.indo}</strong>?`;
      correctAnswer = vocab.korean;
      choices = [vocab.korean, ...shuffle(vocabList.filter(v => v.korean !== vocab.korean)).slice(0, 3).map(v => v.korean)];
    }

    choices = shuffle(choices);

    const qDiv = document.createElement("div");
    qDiv.className = "question";
    qDiv.setAttribute("data-answer", correctAnswer);
    qDiv.innerHTML = `<p>${index + 1}. ${questionText}</p>` +
      choices.map(choice => `
        <label>
          <input type="radio" name="q${index}" value="${choice}"> ${choice}
        </label><br>`).join("");

    quizForm.appendChild(qDiv);
  });
}

function checkAnswers() {
    let score = 0;
    let wrongAnswers = [];
  
    const allQuestions = document.querySelectorAll(".question");
  
    allQuestions.forEach((qDiv, index) => {
      const correct = qDiv.getAttribute("data-answer");
      const questionText = qDiv.querySelector("p").innerHTML;
      const selected = qDiv.querySelector("input[type=radio]:checked");
      const selectedVal = selected ? selected.value : "Tidak dijawab";
  
      if (selected && selected.value === correct) {
        score++;
      } else {
        wrongAnswers.push({
          question: questionText,
          chosen: selectedVal,
          correct: correct
        });
      }
    });
  
    localStorage.setItem("skorKuis", score);
    localStorage.setItem("totalSoal", allQuestions.length);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));
    window.location.href = "hasil.html";
  }
  
function disableQuiz() {
  const inputs = document.querySelectorAll("input[type=radio]");
  inputs.forEach(input => input.disabled = true);
}

let timeLeft = 1000;
const timerElement = document.getElementById("timer");

function startCountdown() {
  const countdown = setInterval(() => {
    timerElement.textContent = `Waktu: ${timeLeft} detik`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown);
      timerElement.textContent = "Waktu habis!";
      disableQuiz();
      checkAnswers();
    }
  }, 1000);
}

createQuiz();
startCountdown();
