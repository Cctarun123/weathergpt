from connection import get_connection

def create_user(name, email):
    connection = get_connection()

    cursor = connection.cursor()
    sql = """INSERT INTO users (name, email) VALUES (%s, %s)"""

    cursor.execute(sql, (name, email))

    connection.commit()
    cursor.close()
    connection.close()

def get_user(email):
    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    SELECT *
    FROM users
    WHERE email = %s
    """

    cursor.execute(sql, (email,))
    user = cursor.fetchone()

    if user is None:
        return None

    return {
    "user_id": user[0],
    "name": user[1],
    "email": user[2],
    "created_at": user[3]
    }

def update_user(email, new_name):
     connection = get_connection()
     cursor = connection.cursor()
     sql="""UPDATE users SET name = %s 
     WHERE email = %s"""

     cursor.execute(sql, (new_name, email))
     connection.commit()
     cursor.close()
     connection.close()

def delete_user(email):
    connection = get_connection()
    cursor = connection.cursor()
    sql="""DELETE FROM users WHERE email = %s"""
    cursor.execute(sql, (email,))
    connection.commit()
    cursor.close()
    connection.close()


def create_chat(user_id, title):
    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO chats (user_id, title)
    VALUES (%s, %s)
    """

    cursor.execute(sql, (user_id, title))
    connection.commit()

    chat_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return chat_id


def get_chat(chat_id):
    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    SELECT *
    FROM chats
    WHERE chat_id = %s
    """

    cursor.execute(sql, (chat_id,))
    chat = cursor.fetchone()

    cursor.close()
    connection.close()

    if chat is None:
        return None

    return {
        "chat_id": chat[0],
        "user_id": chat[1],
        "title": chat[2],
        "created_at": chat[3]
    }

def create_message(chat_id, sender, message):
    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO chat_messages (chat_id, sender, message)
    VALUES (%s, %s, %s)
    """

    cursor.execute(sql, (chat_id, sender, message))
    connection.commit()

    message_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return message_id


def get_messages(chat_id):
    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    SELECT *
    FROM chat_messages
    WHERE chat_id = %s
    ORDER BY created_at ASC
    """

    cursor.execute(sql, (chat_id,))
    messages = cursor.fetchall()

    cursor.close()
    connection.close()

    return [
        {
            "message_id": message[0],
            "chat_id": message[1],
            "sender": message[2],
            "message": message[3],
            "created_at": message[4]
        }
        for message in messages
    ]

if __name__ == "__main__":
    chat_id = 3

    message_id = create_message(
        chat_id,
        "user",
        "What is the weather in Delhi?"
    )

    print("Created message:", message_id)

    messages = get_messages(chat_id)
    print("Messages:", messages)
     
