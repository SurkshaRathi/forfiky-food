# forfiky-food

== DESCRIPTION:

  forkify.rb makes it easy to process a bunch of data using 'n'
  worker processes. It is based off of forkoff and threadify by Ara Howard.
  It aims to be safe to use on Ruby 1.8.6+ and Ruby 1.9.1+

== FEATURES/PROBLEMS:

* forkify is _extremely_ beta quality currently.
* NOTE: Hash forkifing returns a 2-dimensional array.
* Spawn processes easily!
* Pool forking requires ruby 1.9.1

== SYNOPSIS:

  Simple usage:

  enumerable = %w( a b c d )
  enumerable.forkify(2) { 'process this block using two worker processes' }
  enumerable.forkify    { 'process this block using the default of 5 processes' }


  Forkify also supports pool forking (instead of forking serially)
