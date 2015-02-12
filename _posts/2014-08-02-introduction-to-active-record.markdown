---
layout: post
title: "Introduction to Active Record"
date: 2014-08-02 19:30:07
comments: true
---

I am happy to see you Caterpillars today! A lot of the phase_1 challenges involved writing a lot of SQL queries in order to get an information from the database tables. After working with a lot of SQLite3 queries, the challenges shifted towards what Dev Bootcamp calls *Ruby Land*, and attempted to show the differences between *Ruby Land* and *SQL Land*.

## SQLite3

When working with SQLite3, it was a little difficult to work with the data. Let's just quickly take a look at how I would create a ```student``` table:

{% highlight ruby %}
require 'sqlite3'

# If you want to overwrite your database you will need 
# to delete it before running this file
$db = SQLite3::Database.new "students.db"

module StudentDB
  def self.setup
    $db.execute(
      <<-SQL
        CREATE TABLE students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name VARCHAR(64) NOT NULL,
          last_name VARCHAR(64) NOT NULL,

          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL
        );
      SQL
    )
  end

  def self.seed
    $db.execute(
      <<-SQL
        INSERT INTO students 
          (first_name, last_name, created_at, updated_at)
        VALUES
          ('Brick','Thornton',DATETIME('now'), DATETIME('now'));

      SQL
    )
  end
end
{% endhighlight %}

Easy, right? Well, I'm glad you just doubted me for a second there because it's **not** supposed to be clear cut! Now that I have a physical file of the SQLite3 database, I probably want to write some methods in other to query the database for information:

{% highlight ruby %}
class Student

  def initialize(first_name, last_name, birthday)
    @first_name = first_name
    @last_name  = last_name
    @birthday   = birthday
  end

  def self.all
    $db.execute("SELECT * FROM students;")
  end

  def save
    $db.execute(
        "INSERT INTO students 
          (first_name, last_name, birthday, created_at, updated_at)
        VALUES
          (?, ?, ?, ?, ?)", [@first_name, @last_name, @birthday, Time.now.to_s, Time.now.to_s]
    )

  end

  def self.delete(name)
    $db.execute(

      "DELETE FROM students
      WHERE first_name = ?", [name])
  end

  def self.where(str, id)
    $db.execute(
        "SELECT * FROM students WHERE #{str}", [id]
      )
  end

  def self.birthday(birthday_month)
    birthday_month = birthday_month.to_s
    bday = $db.execute(
        "SELECT * FROM students WHERE birthday LIKE '#{birthday_month}%'"
      )
    
  end

end
{% endhighlight %}

I am not saying that this is an unacceptable way. But the best developers are the laziest developers; the laziest developers always find a faster and easier way to do the same task. For one thing, the previous code snippets seem clustered with information. There seems to be a lot of syntax to watch out for as well. In addition, if I was to talk about real life applications with SQLite3, unfortunately it isn't designed to scale. The author of SQLite stated:

> SQLite usually will work great as the database engine for low to medium traffic websites. The amount of web traffic that SQLite can handle depends, of course, on how heavily the website uses its database. Generally speaking, any site that gets fewer than 100K hits/day should work fine with SQLite. The 100K hits/day figure is a conservative estimate, not a hard upper bound. SQLite has been demonstrated to work with 10 times that amount of traffic.
>
> SQLite will normally work fine as the database backend to a website. But if your website is so busy that you are thinking of splitting the database component off onto a separate machine, then you should definitely consider using an enterprise-class client/server database engine instead of SQLite.

## Active Record

So how do I implement an easier way to create databases, and work with the data stored in them? *Active Record*! I'm sure you've all heard how important [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) is from your instructors since week_2 of phase_1. Well, Active Record is the M, or model, in MVC. In other words, it is a design pattern where an object is represented as a record on a table in a relational database. Implementing an Active Record pattern is a description of an [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping), or Object Relational Mapping. The ORM of Active Record allows Ruby and SQL, which are two totally different languages, to understand each other by converting otherwise incompatible data. In other words, Active Record allows the ability to:

  * Represent models and their data
  * Represent associations between these models
  * Represent inheritance hierarchies through related models
  * Validate models before they get persisted to the database
  * Perform database operations in an object-oriented fashion

I would like to use a one-to-many example of authors and books; an author can have many books, but a book has only one author.

## Step 1: Migration

![alt text](/assets/img/migration.jpg "authors-books")

The first step is to create the tables that we will be working with. In the working directory of the terminal, we type:

{% highlight ruby %}
rake generate:migration NAME=create_authors
{% endhighlight %}

{% highlight ruby %}
rake generate:migration NAME=create_books
{% endhighlight %}

This will create a new, empty file in the db > migrate folder as a 'yyyymmddhhmmss_your_migration_name.rb' format. And just to be super specific, in order,

  * y = years
  * m = month
  * d = day
  * h = hours
  * m = minutes
  * s = seconds

{% highlight ruby %}
class CreateAuthors < ActiveRecord::Migration
  def change
  end
end
{% endhighlight %}

{% highlight ruby %}
class CreateBooks < ActiveRecord::Migration
  def change
  end
end
{% endhighlight %}

Let's create a database table in this migration file:

{% highlight ruby %}
class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title

      t.references :author

      t.timestamps
    end
  end
end
{% endhighlight %}

Because the books table contains a foreign key of author_id, this must be stated in the migration table. This can be done two ways:

  * ```t.references :author```
  * ```t.belongs_to :author```

The reason why it's author, and not authors is because we are referring to one only author in the authors table.

A couple of things to always remember when creating a migration:

  1. The name must always be pluralized, since the table names should be plural.
  2. It is good practice to create one table per migration.
  3. Migrations don't care about classes, controllers, or views since it just creates schemas.

## Step 2: Models

Once the migrations are setup properly, the models for each table should be setup next:

{% highlight ruby %}
rake generate:model NAME=Author
{% endhighlight %}

{% highlight ruby %}
rake generate:model NAME=Book
{% endhighlight %}

This will create a new, empty file in the app > models folder.

{% highlight ruby %}
class Author < ActiveRecord::Base

end
{% endhighlight %}

{% highlight ruby %}
class Book < ActiveRecord::Base

end
{% endhighlight %}

The name of the migration file and the model must match. This is because when a class inherits from ```ActiveRecord::Base```, Active Record checks the database for a table with a lowercase and plural version of the class name. In addition, Active Record will automatically create CRUD methods to read and manipulate data stored within the tables. CRUD stands for *Can Rabbits Understand Databases*, or if you want to be boring, **C**reate, **R**ead, **U**pdate, and **D**estroy.

## Step 3: Validations

Let's not think about Active Record for a bit, and just discuss the intimate, relationship between authors and books. Well, for one thing, an author will ALWAYS have a name. You don't have an anonymous book, right? Therefore, if we are creating an author object and attempting to write it into the database, we want to make sure that the object has a first and last name. Let's validate that:

{% highlight ruby %}
class Author < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
end
{% endhighlight %}

If any of the validations fail now, the object will be marked as invalid and Active Record will not perform the **INSERT** or **UPDATE** operation.

## Step 4: Associations

As said before, an author has many books, but a book belongs to only one author. Although this relationship may be easy to understand by looking at the above schema, Active Record has no idea of this relationship unless it is told. So an author has many books:

{% highlight ruby %}
class Author < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :books
end
{% endhighlight %}

And a book belongs to an author:

{% highlight ruby %}
class Book < ActiveRecord::Base
  belongs_to :author
end
{% endhighlight %}

Of course there are many other types of associations in a one-to-one, or a many-to-many relationship. The documentation on associations [here](http://guides.rubyonrails.org/association_basics.html) goes over all the different types of associations for your reading pleasure!

## Step 5: Exection

So now that the models and migrations are all setup, all that there is left to do is to actually create the database. So I will first drop any existing database that may exist, create the database, and then migrate the database tables into the database file!

{% highlight ruby %}
rake db:drop
rake db:create
rake db:migrate
{% endhighlight %}

## Conclusion

I hope that the introduction helps understand Active Record a little bit more than when you first started. If you have any questions, please feel free to leave me a comment below!