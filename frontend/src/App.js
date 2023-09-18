import React from 'react'
import './App.css';

class App extends React.Component {
    render() {

      let isQuestionButtonCreated = false;
      let isQuestionCreated = false;
      let isQuestionAccepted = false;
      let questionCounter = 0;
      let answerCounter = 0;
      let isTestOpen = false;

      let testTitle;
      let questionDescription = [];
      let answerDescription = [];
      let answerIsCorrect = [];

      function addButton() {
        if(!isQuestionButtonCreated) {
          const form = document.getElementById("testForm");
          const addQuestionButtonDiv = document.createElement("div");
          const addQuestionButton = document.createElement("button");

          addQuestionButton.id="addQuestion";
          addQuestionButton.type="button";
          addQuestionButton.textContent="Добавить вопрос";
          addQuestionButton.addEventListener('click', addQuestion);

          addQuestionButtonDiv.appendChild(document.createElement("br"));
          addQuestionButtonDiv.appendChild(addQuestionButton);
          form.appendChild(addQuestionButtonDiv);
        }
        isQuestionButtonCreated = true;
      }
      
      function addQuestion() {
        if (!isQuestionCreated) {
          questionCounter++;
          isQuestionAccepted = false;

          const form = document.getElementById("testForm");
          const questionDiv = document.createElement("div");
          const questionLabel = document.createElement("label");
          const questionInput = document.createElement("input");
          const answerLabel = document.createElement("label");
          const answerCheckBox1 = document.createElement("input")
          const answerInput1 = document.createElement("input");
          const answerCheckBox2 = document.createElement("input")
          const answerInput2 = document.createElement("input"); 
          const acceptButton = document.createElement("button");

          questionDiv.id = `questionDiv${questionCounter}`;
          questionLabel.textContent = `Вопрос ${questionCounter}: `;
          questionInput.type = "text";
          questionInput.id = `question${questionCounter}`;
          questionInput.required = true;
          answerLabel.textContent = "Варианты ответа:";
          answerCounter++;
          answerInput1.type = "text";
          answerInput1.id = `answer${questionCounter}${answerCounter}`;
          answerInput1.required = true;
          answerCheckBox1.type = "checkbox";
          answerCheckBox1.id = `checkbox${questionCounter}${answerCounter}`;
          answerCounter++;
          answerInput2.type = "text";
          answerInput2.id = `answer${questionCounter}${answerCounter}`;
          answerInput2.required = true;
          answerInput2.addEventListener('input', addExtraAnswer);
          answerCheckBox2.type = "checkbox";
          answerCheckBox2.id = `checkbox${questionCounter}${answerCounter}`;
          acceptButton.id = "acceptButton";
          acceptButton.textContent = "Сохранить вопрос";
          acceptButton.className = "btn";

          acceptButton.onclick = function() {
            acceptQuestion(questionDiv.id);
          };

          questionDiv.appendChild(document.createElement("br"));
          questionDiv.appendChild(questionLabel);
          questionDiv.appendChild(questionInput);
          questionDiv.appendChild(acceptButton);
          questionDiv.appendChild(document.createElement("br"));
          questionDiv.appendChild(document.createElement("br"));
          questionDiv.appendChild(answerLabel);
          questionDiv.appendChild(document.createElement("br"));
          questionDiv.appendChild(answerCheckBox1);
          questionDiv.appendChild(answerInput1);
          questionDiv.appendChild(document.createElement("br"));
          questionDiv.appendChild(answerCheckBox2);
          questionDiv.appendChild(answerInput2);
          questionDiv.appendChild(document.createElement("br"));
          form.appendChild(questionDiv);

          isQuestionCreated = true;

          function addExtraAnswer() {
            document.getElementById(`answer${questionCounter}${answerCounter}`).removeEventListener('input', addExtraAnswer);

            const answerCheckBoxExtra = document.createElement("input")
            const answerInputExtra = document.createElement("input");
            const deleteAnswerExtra = document.createElement("input");
              
            answerCounter++;
            answerCheckBoxExtra.type = "checkbox";
            answerCheckBoxExtra.id = `checkbox${questionCounter}${answerCounter}`;
            answerInputExtra.type = "text";
            answerInputExtra.id = `answer${questionCounter}${answerCounter}`;
            answerInputExtra.required = true;
            answerInputExtra.addEventListener('input', addExtraAnswer);
            
            deleteAnswerExtra.type = "button";
            deleteAnswerExtra.id = `${questionCounter}${answerCounter}`;
            deleteAnswerExtra.value = "x";

            deleteAnswerExtra.onclick = function() {
              deleteAnswer();
            };

            questionDiv.appendChild(answerCheckBoxExtra);
            questionDiv.appendChild(answerInputExtra);
            questionDiv.appendChild(deleteAnswerExtra);
            const br = document.createElement("br");
            br.id = `br${questionCounter}${answerCounter}`;
            questionDiv.appendChild(br);

            if(answerCounter > 3) {
                document.getElementById(`${questionCounter}${answerCounter - 1}`).remove();
            }
          }

          function deleteAnswer() {
            document.getElementById(`${questionCounter}${answerCounter}`).removeEventListener('click', null);
            document.getElementById(`checkbox${questionCounter}${answerCounter}`).remove();
            document.getElementById(`answer${questionCounter}${answerCounter}`).remove();
            document.getElementById(`${questionCounter}${answerCounter}`).remove();
            document.getElementById(`br${questionCounter}${answerCounter}`).remove();

            answerCounter--;
            if(answerCounter > 2) {
              const deleteAnswerNew = document.createElement("input");
              deleteAnswerNew.type = "button";
              deleteAnswerNew.id = `${questionCounter}${answerCounter}`;
              deleteAnswerNew.value = "x";
              deleteAnswerNew.onclick = function () {
                deleteAnswer();
              }
              document.getElementById(`br${questionCounter}${answerCounter}`).remove();
              document.getElementById(`questionDiv${questionCounter}`).appendChild(deleteAnswerNew);
              const br = document.createElement("br");
              br.id = `br${questionCounter}${answerCounter}`;
              questionDiv.appendChild(br);
            } else {
              document.getElementById(`answer${questionCounter}${answerCounter}`).addEventListener('click', addExtraAnswer);
            }
          }
      }
    }

      function acceptQuestion(questionId) {
        questionDescription[questionCounter - 1] = document.getElementById(`question${questionCounter}`).value;
        if(questionDescription[questionCounter - 1] === "") {
          alert("Введите ваш вопрос!");
          return;
        }

        answerDescription[questionCounter - 1] = [];
        for(let i = 0; i < answerCounter; i++) {
          answerDescription[questionCounter - 1][i] = document.getElementById(`answer${questionCounter}${i + 1}`).value;
          if(answerDescription[questionCounter - 1][i] === "") {
            alert("Заполните поля ответов!");
            return;
          }
        }
        answerIsCorrect[questionCounter - 1] = [];
        for(let i = 0; i < answerCounter; i++) {
          answerIsCorrect[questionCounter - 1][i] = document.getElementById(`checkbox${questionCounter}${i + 1}`).checked;
        }

        const questionDiv = document.getElementById(questionId);
        questionDiv.parentNode.removeChild(questionDiv);

        answerCounter = 0;
        isQuestionCreated = false;
        isQuestionAccepted = true;
      }

      async function saveTest() {
        testTitle = document.getElementById("testid").value;
        if(testTitle === "") {
          window.alert("Введите название теста!");
          return;
        }

        if (!isQuestionAccepted) {
          window.alert("Сохраните вопрос перед выходом!");
          return;
        } 

        let isConfirm = window.confirm("Сохранить тест перед выходом?");

        if (isConfirm) {
          testTitle = {
            "title": testTitle
          };
          testTitle = JSON.stringify(testTitle);
          
          const repsonseTest = await fetch("http://localhost:8080/test/", {
              method: 'POST',
              headers: {'Content-Type': 'application/json;charset=utf-8'},
              body: testTitle     
          })
          const dataTest = await repsonseTest.json();

          for(let i = 0; i < questionCounter; i++) {
            questionDescription[i] = {
              "questionTest_id": i + 1,
              "description": questionDescription[i],
              "test_id": JSON.stringify(dataTest.id)
            }
            questionDescription[i] = JSON.stringify(questionDescription[i]);

            const responseQuestion = await fetch("http://localhost:8080/question/", {
              method: 'POST',
              headers: {'Content-Type': 'application/json;charset=utf-8'},
              body: questionDescription[i]
            })
            const dataQuestion = await responseQuestion.json();

            let answerLength = answerDescription[i].length;
            for(let j = 0; j < answerLength; j ++) {
              answerDescription[i][j] = {
                "question_id": JSON.stringify(dataQuestion.id),
                "questionTest_id": i + 1,
                "answer_id": j + 1,
                "description": answerDescription[i][j],
                "isCorrect": answerIsCorrect[i][j]
              }
              answerDescription[i][j] = JSON.stringify(answerDescription[i][j]);
              await fetch("http://localhost:8080/answer/", {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: answerDescription[i][j]
              })
            }
          }
        }
        window.location.reload();
      }

      function viewMainDiv() {
        const backButton = document.createElement("input");
        backButton.type = "button";
        backButton.value = "Вернуться назад";
        backButton.onclick = function() {
          window.location.reload()
        }  
        document.getElementById("windowDiv").insertBefore(backButton, document.getElementById("mainDiv"));

        document.getElementById("mainDiv").style.display = "block";
        document.getElementById("testList").remove();
        document.getElementById("createTestButton").remove();
      }

      async function openTest (testId, testTitle) {
        isTestOpen = true;

        const windowDiv = document.getElementById("windowDiv");
        const testDiv = document.createElement("div");
        const title = document.createElement("h1");
        title.textContent = testTitle;
        testDiv.appendChild(title);
        windowDiv.appendChild(testDiv);

        document.getElementById("viewTestListDiv").remove();
        document.getElementById("backButton").onclick = function() {
          testDiv.remove();
          viewTestList();
        }

        testId = JSON.stringify(testId);
        let responseQuestion = await fetch(`http://localhost:8080/question/${testId}`);
        let questionData = await responseQuestion.json();

        for (const question of questionData) {
          const questionTitle = document.createElement("h4");
          questionTitle.textContent = question.description;
          testDiv.appendChild(questionTitle);
          testDiv.appendChild(document.createElement("br"));

          let responseAnswer = await fetch(`http://localhost:8080/answer/${question.id}`);
          let answerData = await responseAnswer.json();

          answerData.forEach(answer => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox${question.id}${answer.id}`;
    
            const label = document.createElement("label");
            label.textContent = answer.description;
    
            testDiv.appendChild(checkbox);
            testDiv.appendChild(label);
            testDiv.appendChild(document.createElement("br"));
          })
          testDiv.appendChild(document.createElement("br"));
        }
        const resultButton = document.createElement("input");
        resultButton.type = "button";
        resultButton.value = "Завершить тест";
        resultButton.onclick = async function () {
          let questionCounter = 0;
          let result = 0;
          for (const question of questionData) {
            questionCounter++;
            let responseAnswer = await fetch(`http://localhost:8080/answer/${question.id}`);
            let answerData = await responseAnswer.json();
            
            let isAnswerCorrect = true;
            answerData.forEach(answer => {
              const checkbox = document.getElementById(`checkbox${question.id}${answer.id}`);
              if (!(answer.iscorrect === checkbox.checked)) {
                isAnswerCorrect = false;
              }
            })
            if(isAnswerCorrect) {
              result++;
            }
          }
          alert("Вы ответили правильно на " + result + " из " + questionCounter + " вопросов \n Ваш итоговый результат: " + result/questionCounter*100 + " из 100");
          testDiv.remove();
          viewTestList();
        }
        testDiv.appendChild(resultButton);
      }

      async function viewTestList() {
        const windowDiv = document.getElementById("windowDiv");
        const viewTestListDiv = document.createElement("div");
        viewTestListDiv.id = "viewTestListDiv";

        if(!isTestOpen) {
          document.getElementById("createTestButton").remove();
          document.getElementById("testList").remove();
          document.getElementById("mainDiv").remove();
          const backButton = document.createElement("button");
          backButton.id = "backButton";
          backButton.type = "button";
          backButton.textContent = "Вернуться назад";
          backButton.className = "btn";
          backButton.onclick = function() {
            window.location.reload()
          }
          windowDiv.appendChild(backButton);
        } else {
          const backButton = document.getElementById("backButton");
          backButton.onclick = function() {
            window.location.reload();
          };
        }

        let response = await fetch(`http://localhost:8080/test`);
        let responseData = await response.json();

        if(responseData.length > 0) {
          let table = document.createElement("table");
          table.id = "table";
          let thead = document.createElement("thead");
          let tbody = document.createElement("tbody");

          table.appendChild(thead);
          table.appendChild(tbody);

          let row = document.createElement("tr");
          let heading_1 = document.createElement("th");
          let heading_2 = document.createElement("th");

          heading_1.innerHTML = "ID теста";
          heading_2.innerHTML = "Название теста";

          row.appendChild(heading_1);
          row.appendChild(heading_2);
          thead.appendChild(row);

          responseData.forEach(response => {
            let row = document.createElement("tr");

            let rowData1 = document.createElement("td");
            rowData1.innerHTML = response.id;

            let rowData2 = document.createElement("td");
            rowData2.innerHTML = response.title;

            let openTestB = document.createElement("button");
            openTestB.type = "button";
            openTestB.className = "btn";
            openTestB.id = `openTestB${response.id}`;
            openTestB.textContent = "Пройти тест";
            openTestB.onclick = function() {
              openTest(response.id, response.title);
            }

            row.appendChild(rowData1);
            row.appendChild(rowData2);
            row.appendChild(document.createElement("br"));
            row.appendChild(openTestB);
            tbody.appendChild(row);
          });
          viewTestListDiv.appendChild(document.createElement("br"));
          viewTestListDiv.appendChild(document.createElement("br"));
          viewTestListDiv.appendChild(table);
        }
        windowDiv.appendChild(viewTestListDiv);
      }

      return (
        <div id="windowDiv">
          <br id = "mainBr"/>
          <button id="createTestButton" type="button" class="btn" onClick={viewMainDiv}>Создать новый тест</button>
          <button id="testList" type="button" class="btn" onClick={viewTestList}>Показать список тестов</button>
          <div id="mainDiv">
            <h1>Добавление теста</h1>
            <form id="testForm">
              <label htmlFor="testid">Название теста: </label>
              <input id="testid" type="text" onInput={addButton} required />
              <button id="saveButton" type="button" className = "btn" onClick={saveTest}>Выйти и сохранить</button>
            </form>
          </div>
        </div>
      )
    }
}

export default App;