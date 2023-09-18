CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
)

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    questionTest_id INTEGER,
    description VARCHAR(255),
    test_id INTEGER,
    FOREIGN KEY (test_id) REFERENCES test(id)
)

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
	question_id INTEGER,
    questionTest_id INTEGER,
    answer_id INTEGER,
    description VARCHAR(255),
    isCorrect BOOLEAN,
	FOREIGN KEY(question_id) REFERENCES question(id)
)