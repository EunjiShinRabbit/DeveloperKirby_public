package com.developerkirby.Main.VO;

import java.sql.Date;
import java.util.List;

public class WriteVO {
	private int writeNum;
	private String writeName;
	private String nickname;
	private Date writeDate;
	private int countComment;
	private int countGood;
	private String boardName;
	private String writeContents;
	private List<CommentsVO> comments;
	private String writeDateStr;
	private String pfImg;
	
	public int getWriteNum() {
		return writeNum;
	}
	public void setWriteNum(int writeNum) {
		this.writeNum = writeNum;
	}
	public String getWriteName() {
		return writeName;
	}
	public void setWriteName(String writeName) {
		this.writeName = writeName;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Date getWriteDate() {
		return writeDate;
	}
	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}
	public int getCountComment() {
		return countComment;
	}
	public void setCountComment(int countComment) {
		this.countComment = countComment;
	}
	public int getCountGood() {
		return countGood;
	}
	public void setCountGood(int countGood) {
		this.countGood = countGood;
	}
	public String getBoardName() {
		return boardName;
	}
	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}
	public String getWriteContents() {
		return writeContents;
	}
	public void setWriteContents(String writeContents) {
		this.writeContents = writeContents;
	}
	public List<CommentsVO> getComments() {
		return comments;
	}
	public void setComments(List<CommentsVO> comments) {
		this.comments = comments;
	}
	public String getWriteDateStr() {
		return writeDateStr;
	}
	public void setWriteDateStr(String writeDateStr) {
		this.writeDateStr = writeDateStr;
	}
	public String getPfImg() {
		return pfImg;
	}
	public void setPfImg(String pfImg) {
		this.pfImg = pfImg;
	}
}