---
layout: post
title: "Many-to-Many Relationships in ActiveRecord"
date: 2014-07-16 21:20:41
comments: true
---

After getting destroyed on ActiveRecord yesterday, I sadly went home to wind down by watching fun, random videos on [youtube](www.youtube.com), and out of nowhere by the beard of zeus came this epiphany of what example I can use for my presentation on many-to-many relationships; **a user has many youtube channels he/she subscribes to, and a youtube channel has many user subscriptions**.

So I went to [dev bootcamp's](https://socrates.devbootcamp.com/sql) SQL designer and quickly whipped up this nice schema of the many-to-many relationship.

![alt text](/assets/img/many-to-many.jpg "Many youtube channels & many users")

There are essentially two ways we can setup this many-to-many relationship in ActiveRecord. The first way is what I like to call, *Horses And Beer Tour Maybe*, or HABToM, or if you want to just be ordinary, ```has_and_belongs_to_many```.

Just like how I mapped out the relationship in the schema, I would create three tables for the migration: ```channels```, ```users```, and ```channels_users```.

{% highlight ruby %}
class CreateChannels < ActiveRecord::Migration
  def change
    create_table :channels do |t|
      t.string :name
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
class CreateChannelsUsersJoin < ActiveRecord::Migration
  def change
    create_table :channels_users, id: false do |t|
      t.belongs_to :channel
      t.belongs_to :user
    end
  end
end
{% endhighlight %}


Okay, now that the migration tables are all set up, the models for each table needs to be completed next; I do **not** need to create a JOIN table for ```channels_users```.

{% highlight ruby %}
class Channel < ActiveRecord::Migration
  has_and_belongs_to_many :users
end
{% endhighlight %}

{% highlight ruby %}
class User < ActiveRecord::Migration
  has_and_belongs_to_many :channels
end
{% endhighlight %}


And there you have it! The association is all setup and finished! There are three things to this method that I would like to point out:

  1. Notice how the ```channels_users``` table ONLY contains ```channel_id``` and ```user_id```. This is because the JOIN table only allows for those two columns, and nothing else!
  2. There is a naming convention to follow for the JOIN table. You have to combine the names of the other two tables in alphabetical order, separated by an underscore. In this case, it would be ```channels_users```.
  3. You do not need to create a model for the JOIN table.


Now that I went over HABToM as a way to show association between a many-to-many relationship in ActiveRecord, I would like to go over another method in what I like to call, *Holy Moly Tomato*, or HMT, or if you want to be boring, ```has_many :through```.

This method is a little bit different than the schema; my JOIN table will hold a different set of data, ```comments```.

{% highlight ruby %}
class CreateChannels < ActiveRecord::Migration
  def change
    create_table :channels do |t|
      t.string :name
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :channel
      t.belongs_to :user
      t.timestamps
    end
  end
end
{% endhighlight %}


Okay, now that the migration tables are all set up, the models for all three tables need to be completed next.

{% highlight ruby %}
class Comment < ActiveRecord::Migration
  belongs_to :channel
  belongs_to :user
end
{% endhighlight %}

{% highlight ruby %}
class Channel < ActiveRecord::Migration
  has_many :comments
  has_many :users, through: :comments
end
{% endhighlight %}

{% highlight ruby %}
class User < ActiveRecord::Migration
  has_many :comments
  has_many :channels, through: :comments
end
{% endhighlight %}


And it's as simple as that! The ```has_many :through``` association is all setup! However, there are a couple of things I want to point out:

  1. If you use the association ```has_many :through```, the JOIN table is allowed other table columns.
  2. The naming convention is to have one word that describes the relationship between the two tables. You should try to have the word end in -tion or -ment. If you cannot think of a word, a word can be made up.
  3. You need to create a model for the JOIN table.

Now, for the million dollar question...

## How do you know to choose which method to use?

The three questions you need to ask yourself when creating a many-to-many assocation are:

  1. Do you need to store extra information in the JOIN table?
  2. Do you need to treat the JOIN table like its own model?
  3. Do you feel like you need to always use the newest methods and conventions?


If you answered yes to any of these two questions, or if you are confused on what's happening, always go for the ```has_many :through``` method. Unfortunately, the ```has_and_belongs_to_many``` method is starting to become obsolete because of its inflexibility. So when in doubt, use the ```has_many :through``` association!


## Conclusion

Well I hope you enjoyed this technical blog post on the two ways to show a many-to-many relationship in ActiveRecord. I enjoyed writing this post, and I hope you found it useful!!

Please feel free to leave me a comment on your thoughts!