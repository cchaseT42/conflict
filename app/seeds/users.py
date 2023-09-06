from app.models import db, User, Server, Member, Message, Channel, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    server1 = Server(
        name="testServer", img_url="testurl", owner_id=1
    )

    server2 = Server(
        name="testServer2", img_url="testurl2", owner_id=2
    )

    member1 = Member(
        user_id=1, server_id=1
    )
    member2 = Member(
        user_id=2, server_id=1
    )
    member3 = Member(
        user_id=1, server_id=2
    )
    member4 = Member(
        user_id=2, server_id=2
    )

    channel1 = Channel(
        id=1, name="testchannel", server_id=1
    )

    channel2 = Channel(
        id=2, name="testchannel2", server_id=1
    )

    channel3 = Channel(
        id=3, name="testchannel3", server_id=2
    )

    message1= Message(
        message="helloworld", channel_id=1, owner_id=1
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(message1)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
