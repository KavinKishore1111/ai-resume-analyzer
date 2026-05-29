import re

from sklearn.feature_extraction.text import (
    TfidfVectorizer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from app.utils.semantic_matcher import (
    calculate_semantic_similarity
)

SKILL_MAPPINGS = {

    # =========================
    # JAVASCRIPT / FRONTEND
    # =========================
    "js": "javascript",
    "javascriptes6": "javascript",
    "javascriptes5": "javascript",
    "nodejs": "node",
    "node": "nodejs",
    "reactjs": "react",
    "react.js": "react",
    "nextjs": "next",
    "next.js": "next",
    "vuejs": "vue",
    "vue.js": "vue",
    "angularjs": "angular",
    "angular.js": "angular",
    "expressjs": "express",
    "express.js": "express",
    "nestjs": "nestjs",
    "tailwindcss": "tailwind",
    "tailwindcssframework": "tailwind",
    "bootstrap5": "bootstrap",
    "mui": "materialui",
    "material-ui": "materialui",
    "chakraui": "chakra",
    "reduxjs": "redux",

    # =========================
    # BACKEND / APIs
    # =========================
    "restful": "rest",
    "restfulapi": "rest",
    "restapi": "rest",
    "restapis": "rest",
    "graphqlapi": "graphql",
    "soapapi": "soap",
    "jwtauthentication": "jwt",
    "oauth2": "oauth",
    "microservicesarchitecture": "microservices",

    # =========================
    # PYTHON
    # =========================
    "python3": "python",
    "fastapi framework": "fastapi",
    "django framework": "django",
    "flask framework": "flask",
    "pytorchframework": "pytorch",
    "tensorflowframework": "tensorflow",
    "scikitlearn": "sklearn",
    "scikit-learn": "sklearn",
    "numpylibrary": "numpy",
    "pandaslibrary": "pandas",

    # =========================
    # JAVA
    # =========================
    "corejava": "java",
    "springboot": "spring",
    "springbootframework": "spring",
    "springmvc": "spring",
    "hibernateframework": "hibernate",
    "mavenbuildtool": "maven",

    # =========================
    # DATABASES
    # =========================
    "postgres": "postgresql",
    "postgresdb": "postgresql",
    "postgresqlserver": "postgresql",
    "mongo": "mongodb",
    "mongodbatlas": "mongodb",
    "mysqlserver": "mysql",
    "mssql": "sqlserver",
    "sqlserverdb": "sqlserver",
    "firebasefirestore": "firebase",
    "redisdb": "redis",

    # =========================
    # DEVOPS / CLOUD
    # =========================
    "dockercontainer": "docker",
    "dockercontainers": "docker",
    "k8s": "kubernetes",
    "kubernetesservice": "kubernetes",
    "amazonwebservices": "aws",
    "awsec2": "aws",
    "awss3": "aws",
    "azurecloud": "azure",
    "googlecloudplatform": "gcp",
    "gcpcloud": "gcp",
    "cicd": "ci/cd",
    "githubactions": "ci/cd",
    "jenkinspipeline": "jenkins",

    # =========================
    # VERSION CONTROL
    # =========================
    "gitgithub": "git",
    "github": "git",
    "gitlab": "git",
    "bitbucket": "git",

    # =========================
    # MOBILE DEVELOPMENT
    # =========================
    "reactnative": "react-native",
    "flutterframework": "flutter",
    "androidstudio": "android",
    "iosdevelopment": "ios",

    # =========================
    # AI / ML / DATA SCIENCE
    # =========================
    "machinelearning": "ml",
    "deeplearning": "dl",
    "artificialintelligence": "ai",
    "naturallanguageprocessing": "nlp",
    "computervision": "cv",
    "huggingface transformers": "huggingface",
    "openaiapi": "openai",
    "langchainframework": "langchain",
    "llm": "large-language-models",

    # =========================
    # TESTING
    # =========================
    "jestjs": "jest",
    "pytestframework": "pytest",
    "seleniumwebdriver": "selenium",
    "cypressio": "cypress",

    # =========================
    # TOOLS
    # =========================
    "visualstudiocode": "vscode",
    "vs code": "vscode",
    "postmanapi": "postman",
    "figmadesign": "figma",
    "linuxos": "linux",
    "ubuntulinux": "linux",

    # =========================
    # LANGUAGES
    # =========================
    "cplusplus": "cpp",
    "csharp": "c#",
    "golang": "go",
    "typescriptlanguage": "typescript",

    # =========================
    # DATA / BIG DATA
    # =========================
    "apachekafka": "kafka",
    "apacheairflow": "airflow",
    "apachespark": "spark",
    "hadoopframework": "hadoop",

    # =========================
    # SECURITY
    # =========================
    "cybersecurity": "security",
    "penetrationtesting": "pentesting",
    "ethicalhacking": "security"
}

STOPWORDS = {
    "and", "or", "the", "with", "for",
    "a", "an", "to", "of", "in",
    "on", "at", "by", "is", "are",
    "experience", "looking" , "skills",
    "required","preferred","knowledge",
    "candidate","team","developer","work",
    "responsibilities","strong","understanding",
    "abilities","good","best","ideal","motivated",
    "join","we","our","should","have"
}
TECH_SKILLS = {

    # Languages
    "python",
    "java",
    "javascript",
    "typescript",
    "c",
    "cpp",
    "c#",
    "go",

    # Frontend
    "react",
    "next",
    "vue",
    "angular",
    "html",
    "css",
    "tailwind",
    "bootstrap",
    "redux",

    # Backend
    "nodejs",
    "express",
    "fastapi",
    "django",
    "flask",
    "spring",
    "nestjs",

    # Databases
    "mongodb",
    "postgresql",
    "mysql",
    "redis",
    "firebase",
    "sqlserver",

    # APIs/Auth
    "rest",
    "graphql",
    "jwt",
    "oauth",

    # DevOps/Cloud
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "ci/cd",
    "jenkins",

    # AI/ML
    "ml",
    "dl",
    "ai",
    "nlp",
    "tensorflow",
    "pytorch",
    "sklearn",
    "numpy",
    "pandas",
    "huggingface",
    "langchain",

    # Tools
    "git",
    "postman",
    "linux",
    "vscode",

    # Data Engineering
    "spark",
    "kafka",
    "airflow",
    "hadoop",

    # Mobile
    "react-native",
    "flutter",

    # Misc
    "microservices",
    "socketio"
}


def clean_text(text: str):

    # lowercase
    text = text.lower()

    # remove special chars
    text = re.sub(
        r"[^a-zA-Z0-9\s]",
        "",
        text
    )

    return text


def extract_keywords(text: str):

    text = clean_text(text)

    words = text.split()

    normalized_words = []

    for word in words:
        normalized_word = (
            SKILL_MAPPINGS.get(word, word)
        )

        normalized_words.append(
            normalized_word
        )

    filtered_words = {
        word for word in normalized_words
        if  (
            word not in STOPWORDS
            and word in TECH_SKILLS
        )
    }

    return filtered_words


def calculate_similarity(
    resume_text: str,
    job_description: str
):

    documents = [
        clean_text(resume_text),
        clean_text(job_description)
    ]

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(
        documents
    )

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )

    return round(
        float(similarity[0][0]) * 100,
        2
    )

def generate_recommendations(
    score,
    missing_keywords,
    matched_keywords
):

    recommendations = []

    # LOW SCORE

    if score < 40:
        recommendations.append(
            "Your resume has low ATS alignment with the job description. Tailor your resume more specifically for this role."
        )

    # MEDIUM SCORE

    elif score < 70:
        recommendations.append(
            "Your resume partially matches the job requirements. Adding more role-specific projects and technologies could improve ATS performance."
        )

    # HIGH SCORE

    else:
        recommendations.append(
            "Your resume shows strong alignment with the job description. Minor optimizations could further improve ATS ranking."
        )

    # DEVOPS / CLOUD

    cloud_skills = {
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",
        "ci/cd"
    }

    missing_cloud = (
        cloud_skills.intersection(
            missing_keywords
        )
    )

    if missing_cloud:
        recommendations.append(
            f"Consider adding cloud or DevOps technologies like {', '.join(missing_cloud)} to improve backend and deployment relevance."
        )

    # BACKEND

    backend_skills = {
        "nodejs",
        "express",
        "fastapi",
        "django",
        "spring",
        "microservices"
    }

    missing_backend = (
        backend_skills.intersection(
            missing_keywords
        )
    )

    if missing_backend:
        recommendations.append(
            f"Your profile could benefit from stronger backend experience using technologies such as {', '.join(missing_backend)}."
        )

    # FRONTEND

    frontend_skills = {
        "react",
        "next",
        "vue",
        "angular",
        "tailwind"
    }

    matched_frontend = (
        frontend_skills.intersection(
            matched_keywords
        )
    )

    if len(matched_frontend) >= 3:
        recommendations.append(
            "Your resume demonstrates strong frontend development skills, which is valuable for modern full-stack roles."
        )

    # DATABASES

    db_skills = {
        "postgresql",
        "mongodb",
        "mysql",
        "redis"
    }

    missing_db = (
        db_skills.intersection(
            missing_keywords
        )
    )

    if missing_db:
        recommendations.append(
            f"Database technologies such as {', '.join(missing_db)} are missing from your resume and may improve ATS matching."
        )

    return recommendations


def analyze_resume(
    resume_text: str,
    job_description: str
):

    resume_keywords = extract_keywords(
        resume_text
    )

    jd_keywords = extract_keywords(
        job_description
    )

    # matched keywords
    matched_keywords = (
        resume_keywords.intersection(
            jd_keywords
        )
    )

    # missing keywords
    missing_keywords = (
        jd_keywords.difference(
            resume_keywords
        )
    )

    # semantic similarity score
    semantic_score = (
        calculate_semantic_similarity(
            resume_text,
            job_description
        )
    )

    # skill overlap score
    if len(jd_keywords) == 0:
        skill_score = 0
    else:
        skill_score = (
            len(matched_keywords)
            / len(jd_keywords)
        ) * 100

    # hybrid weighted score
    final_score = (
        semantic_score * 0.45
        + skill_score * 0.55
    )

    # HIGH MATCH BOOST

    if (
        len(matched_keywords) >= 8
        and skill_score >= 60
    ):
        final_score += 8

    recommendations = (
    generate_recommendations(
        final_score,
        missing_keywords,
        matched_keywords
    )
)








    return {
    "match_score": round(
        float(final_score),
        2
    ),

    "semantic_score": round(
        float(semantic_score),
        2
    ),

    "skill_score": round(
        float(skill_score),
        2
    ),

    "matched_keywords": list(
        matched_keywords
    ),

    "missing_keywords": list(
        missing_keywords
    ),

    "recommendations": recommendations
}