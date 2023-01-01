package com.developerkirby.Admin;

public class AdminEmailMain {
	public static void main(String[] args) {
		EmailSender mail = new EmailSender(/* 자신의 메일 계정 */,"developerkirby",/* 자신의 메일 계정 암호 */);
//		mail.sendSimple("heej0258@naver.com","heeju");
	
//		mail.sendHtml("heej0258@naver.com","heeju");
		System.out.println("message sent successfully...");
	}
	  
}
