require 'rugged'
require 'iconv'

class CommitsController < ApplicationController
  before_action :set_commit, only: [:show, :edit, :update, :destroy]

  def initialize
    logger.info "Using git repo: #{Rails.application.config.git_path}" 
	@repo = Rugged::Repository.new(Rails.application.config.git_path)
  end

  # GET /commits
  # GET /commits.json
  def index
    @commits = Commit.all
  end

  # GET /commits/1
  # GET /commits/1.json
  def show
    @test_var = ""
    commit = @repo.lookup(@commit.sha)
    if commit.parents.length > 0
      diff_commits = commit.parents[0].diff(commit, :context_lines => 100000000)
      @test_var = Iconv.conv('utf-8', 'latin1', diff_commits.patch())
    end
    render :layout => 'application'
  end

  # GET /commits/new
  def new
    @commit = Commit.new
  end

  # GET /commits/1/edit
  def edit
  end

  # POST /commits
  # POST /commits.json
  def create
    @commit = Commit.new

    #walker = Rugged::Walker.new(@repo)
    #
    #walker.sorting(Rugged::SORT_TOPO | Rugged::SORT_REVERSE) # optional
    #
    #walker.push('HEAD')
    #walker.each { |c| 
    #  @commit = Commit.new(sha: c.oid, description:c.message,
    #                       author: c.author[:name], commit_date: c.author[:time])
    #  @commit.save
    #}
    #walker.reset

    respond_to do |format|
        format.html { redirect_to @commit, notice: 'Commit was successfully created.' }
        format.json { render :show, status: :created, location: @commit }
    end
  end

  # PATCH/PUT /commits/1
  # PATCH/PUT /commits/1.json
  def update
    respond_to do |format|
      if @commit.update(commit_params)
        format.html { redirect_to @commit, notice: 'Commit was successfully updated.' }
        format.json { render :show, status: :ok, location: @commit }
      else
        format.html { render :edit }
        format.json { render json: @commit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /commits/1
  # DELETE /commits/1.json
  def destroy
    @commit.destroy
    respond_to do |format|
      format.html { redirect_to commits_url, notice: 'Commit was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_commit
      @commit = Commit.find_by_sha(params[:sha])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def commit_params
      params.require(:commit).permit(:sha, :description, :author, :commit_date)
    end
end
