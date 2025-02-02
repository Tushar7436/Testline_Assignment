from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI()

# Configure CORS
app.add_middleware(     
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_URL = "https://api.jsonserve.com/Uw5CrX"

@app.get("/fetch-data")
async def fetch_data():
    """Fetch data from the external API and return it."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(API_URL)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/fetch-data_questions")
async def fetch_data():
    """Fetch data from the external API and return all questions with their descriptions and options."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(API_URL)
            response.raise_for_status()
            data = response.json()
            
            # Extract questions with descriptions and their options
            questions_with_options = []
            for item in data.get("questions", []):
                questions_with_options.append({
                    "question": {
                        "description": item.get("description"),
                        "id": item.get("id"),
                        "type": item.get("type"),
                        "is_mandatory": item.get("is_mandatory"),
                        "show_in_feed": item.get("show_in_feed"),
                        "pyq_label": item.get("pyq_label"),
                        "topic_id": item.get("topic_id"),
                        "reading_material_id": item.get("reading_material_id"),
                        "fixed_at": item.get("fixed_at"),
                        "fix_summary": item.get("fix_summary"),
                        "created_by": item.get("created_by"),
                        "updated_by": item.get("updated_by"),
                        "quiz_level": item.get("quiz_level"),
                        "question_from": item.get("question_from"),
                        "language": item.get("language"),
                        "photo_url": item.get("photo_url"),
                        "photo_solution_url": item.get("photo_solution_url"),
                        "is_saved": item.get("is_saved"),
                        "tag": item.get("tag")

                    },
                    "options": [
                        {
                            "description": opt.get("description"),
                            "id": opt.get("id"),
                            "photo_url": opt.get("photo_url")
                        }
                        for opt in item.get("options", [])
                    ]
                })
            
            return {"questions": questions_with_options}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class UserAnswer(BaseModel):
    question_id: int
    selected_option_id: int

class AnswersPayload(BaseModel):
    answers: list[UserAnswer]  

@app.post("/validate-answer")
async def validate_answer(answers_list: AnswersPayload):
    """Validate the user's selected answers."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(API_URL)
            response.raise_for_status()
            data = response.json()

            results = []
            for submitted_answer in answers_list.answers:
                for item in data.get("questions", []):
                    if item.get("id") == submitted_answer.question_id:
                        question_description = item.get("question", {}).get("description", "Question not available")
                        correct_option = next(
                            (option for option in item.get("options", []) if option.get("is_correct", False)),
                            None,
                        )
                        selected_option = next(
                            (option for option in item.get("options", []) if option.get("id") == submitted_answer.selected_option_id),
                            None,
                        )
                        
                        results.append({
                            "question_id": submitted_answer.question_id,
                            "question_description": question_description,  # Add question description
                            "selected_option_id": submitted_answer.selected_option_id,
                            "selected_option_description": selected_option.get("description", "N/A") if selected_option else "N/A",  # Add selected option description
                            "correct_option_description": correct_option.get("description", "N/A") if correct_option else "N/A",  # Add correct option description
                            "correct": selected_option.get("is_correct", False) if selected_option else False,
                            "detailed_solution": item.get("detailed_solution", "Solution not available"),
                        })

            if not results:
                return {"error": "Question or option not found"}

            return {"results": results}

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
