from fastapi import status


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "timestamp" in data


def test_create_note(client):
    response = client.post("/notes", json={"title": "Test Note", "content": "Test content"})
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["title"] == "Test Note"
    assert data["content"] == "Test content"
    assert "id" in data
    assert "created_at" in data


def test_create_note_minimal(client):
    response = client.post("/notes", json={"title": "Minimal Note"})
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["title"] == "Minimal Note"


def test_list_notes_empty(client):
    response = client.get("/notes")
    assert response.status_code == 200
    assert response.json() == []


def test_list_notes(client):
    client.post("/notes", json={"title": "Note 1", "content": "Content 1"})
    client.post("/notes", json={"title": "Note 2", "content": "Content 2"})
    response = client.get("/notes")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_get_note(client):
    create_response = client.post("/notes", json={"title": "Test", "content": "Content"})
    note_id = create_response.json()["id"]
    response = client.get(f"/notes/{note_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test"


def test_get_note_not_found(client):
    response = client.get("/notes/9999")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_note(client):
    create_response = client.post("/notes", json={"title": "To Delete"})
    note_id = create_response.json()["id"]
    response = client.delete(f"/notes/{note_id}")
    assert response.status_code == 200
    assert client.get(f"/notes/{note_id}").status_code == status.HTTP_404_NOT_FOUND


def test_delete_note_not_found(client):
    response = client.delete("/notes/9999")
    assert response.status_code == status.HTTP_404_NOT_FOUND